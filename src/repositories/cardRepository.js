import dayjs from "dayjs";
import { db } from "../database/mongodb.js";

export async function findOne(query) {
  const card = await db.collection("cards").findOne(query);
  return card;
}

export async function findMany(query) {
  const cards = await db.collection("cards").find(query).toArray();
  return cards;
}

export async function insertOne(userId, card) {
  await db.collection("cards").insertOne({ ...card, userId, date: dayjs().format("DD/MM/YYYY HH:mm") });
}

export async function deleteOne(card) {
  await db.collection("cards").deleteOne(card);
}
