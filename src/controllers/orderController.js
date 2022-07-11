import { createOrder, findOrder } from "../database/dbManager.js";

export default async function createNewOrder(req, res) {
  const { user, order } = res.locals;

  try {
    await createOrder(user, order);

    const orderRegistered = await findOrder(user, order);

    res.status(201).send(orderRegistered);
  } catch (err) {
    console.error("Error while creating a new order", err.message);
    res.sendStatus(500);
  }
}
