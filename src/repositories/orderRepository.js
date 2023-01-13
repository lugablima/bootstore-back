import dayjs from "dayjs";
import { db } from "../database/mongodb.js";

export async function findOne(query) {
  const order = await db.collection("orders").findOne(query);
  return order;
}

export async function insertOne(userId, order) {
  await db.collection("orders").insertOne({ ...order, userId, date: dayjs().format("DD/MM/YYYY HH:mm") });
}
