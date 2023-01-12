import { db } from "../database/mongodb.js";

// eslint-disable-next-line import/prefer-default-export
export async function findMany(query = {}) {
  const products = await db.collection("products").find(query).toArray();
  return products;
}
