import { db } from "../database/mongodb.js";

export async function findMany(query = {}) {
  const products = await db.collection("products").find(query).toArray();
  return products;
}

export async function insertOne(product) {
  await db.collection("products").insertOne(product);
}
