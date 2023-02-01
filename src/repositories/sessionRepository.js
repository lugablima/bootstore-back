import { db } from "../database/mongodb.js";

export async function insertOne(session) {
  await db.collection("sessions").insertOne(session);
}

export async function findOne(session) {
  const storedSession = await db.collection("sessions").findOne(session);
  return storedSession;
}
