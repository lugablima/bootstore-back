import { db, ObjectId } from "../database/mongodb.js";

export async function findOneById(productId) {
  const product = await db.collection("products").findOne({ _id: new ObjectId(productId) });
  return product;
}

export async function findMany(query = {}) {
  const products = await db.collection("products").find(query).toArray();
  return products;
}

export async function insertOne(product) {
  await db.collection("products").insertOne(product);
}
