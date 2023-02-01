import { validateIfTheCardExists } from "./cardsService.js";
import * as orderRepository from "../repositories/orderRepository.js";

export async function createNewOrder(userId, order) {
  await validateIfTheCardExists(userId, order.cardId);

  await orderRepository.insertOne(userId, order);

  const orderRegistered = await orderRepository.findOne({ ...order, userId });

  return orderRegistered;
}
