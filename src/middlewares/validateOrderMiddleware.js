import newOrderSchema from "../schemas/orderSchema.js";
import { findCard } from "../database/dbManager.js";

export default async function validateOrder(req, res, next) {
  const { user } = res.locals;
  const order = req.body;

  const { error } = newOrderSchema.validate(order, { abortEarly: false });

  if (error) {
    return res.status(422).send(error.details.map((err) => ({ message: err.message })));
  }

  try {
    const cardExists = await findCard(order.cardId, user);

    if (!cardExists) return res.status(401).send("This card is not exist!");

    res.locals = { user, order };

    next();
  } catch (err) {
    console.error("Error while validating order", err.message);
    return res.sendStatus(500);
  }
}
