import bcrypt from "bcrypt";
import conflictError from "../errors/conflictError.js";
import * as userRepository from "../repositories/userRepository.js";

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

export async function registerUser(user) {
  await validateIfUserDoesNotExist(user);

  const userFormated = await formatUser(user);

  await userRepository.insertOne(userFormated);
}

export async function logInUser() {
  //
}
