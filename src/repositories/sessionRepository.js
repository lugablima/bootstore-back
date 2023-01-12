import { db } from "../database/mongodb.js";

// eslint-disable-next-line import/prefer-default-export
export async function insertOne(session) {
  await db.collection("sessions").insertOne(session);
}
