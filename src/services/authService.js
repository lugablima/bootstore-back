import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import conflictError from "../errors/conflictError.js";
import notFoundError from "../errors/notFoundError.js";
import * as userRepository from "../repositories/userRepository.js";
import * as sessionRepository from "../repositories/sessionRepository.js";

const TEN_DAYS_IN_SEC = 60 * 60 * 24 * 10;

export async function validateIfUserDoesNotExist(user) {
  const userExist = await userRepository.findOne({ email: user.email });

  if (userExist) {
    throw conflictError("User already registered.");
  }
}

async function hashPassword(password) {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}

export async function formatUser(user) {
  const newUser = { ...user };
  delete newUser.confirmation;

  newUser.password = await hashPassword(user.password);

  return newUser;
}

async function validateUserPasswordOrFail(user) {
  const userExist = await userRepository.findOne({ email: user.email });

  const validatePassword = userExist && bcrypt.compareSync(user.password, userExist.password);

  if (!validatePassword) {
    throw notFoundError("Invalid e-mail or password.");
  }

  return userExist;
}

export async function createSession(userId) {
  const secret = process.env.JWT_SECRET;
  const exp = Date.now() / 1000 + TEN_DAYS_IN_SEC;
  const token = jwt.sign({ userId, exp }, secret);

  await sessionRepository.insertOne({
    userId,
    token,
  });

  return token;
}

export async function registerUser(user) {
  await validateIfUserDoesNotExist(user);

  const userFormated = await formatUser(user);

  await userRepository.insertOne(userFormated);
}

export async function logInUser(user) {
  const { name, _id } = await validateUserPasswordOrFail(user);

  const token = await createSession(_id);

  const data = {
    name,
    token,
  };

  return data;
}
