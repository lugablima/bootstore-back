import { Router } from "express";
import validateToken from "../middlewares/validateTokenMiddleware.js";
import validateOrder from "../middlewares/validateOrderMiddleware.js";
import createNewOrder from "../controllers/orderController.js";

const ordersRouter = Router();

ordersRouter.post("/orders", validateToken, validateOrder, createNewOrder);

export default ordersRouter;
