import { db } from "../database/mongodb.js";

// eslint-disable-next-line import/prefer-default-export
export async function findMany(query) {
  const cards = await db.collection("cards").find(query).toArray();
  return cards;
}
