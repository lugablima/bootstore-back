import { db } from "../database/mongodb.js";

export async function findOne(query) {
  const user = db.collection("users").findOne(query);
  return user;
}

export async function insertOne(user) {
  await db.collection("users").insertOne(user);
}
