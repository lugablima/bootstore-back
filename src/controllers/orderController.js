import * as ordersService from "../services/ordersService.js";

export default async function createNewOrder(req, res) {
  const { user } = res.locals;
  const order = req.body;

  const orderRegistered = await ordersService.createNewOrder(user._id, order);

  res.status(200).send(orderRegistered);
}
