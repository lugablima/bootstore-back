import bcrypt from "bcrypt";
// eslint-disable-next-line import/no-unresolved
import jwt from "jsonwebtoken";
import { db } from "./mongodb.js";

const DAYS_10 = 60 * 60 * 24 * 10;

export async function findUser(query) {
  const user = await db.collection("users").findOne(query);
  return user;
}

export async function createUser(user) {
  const newUser = { ...user };
  delete newUser.confirmation;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(user.password, salt);

  newUser.password = hashedPassword;

  await db.collection("users").insertOne(newUser);
}

export async function createSession(userId) {
  const secret = process.env.JWT_SECRET;
  const exp = Date.now() / 1000 + DAYS_10;
  const token = jwt.sign({ userId, exp }, secret);
  const newSession = {
    userId,
    token,
  };

  await db.collection("sessions").insertOne(newSession);
  return token;
}

export async function findSession(token) {
  const user = await db.collection("sessions").findOne({ token });
  return user;
}

export async function findCards(user) {
  /* eslint-disable-next-line */
  const cards = await db.collection("cards").find({ userId: user._id }).toArray();
  return cards;
}

export async function createCard(user, card) {
  // eslint-disable-next-line no-underscore-dangle
  await db.collection("cards").insertOne({ ...card, userId: user._id });
}
