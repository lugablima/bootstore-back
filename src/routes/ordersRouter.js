import { Router } from "express";
import validateSchema from "../middlewares/schemaValidator.js";
import orderSchema from "../schemas/orderSchema.js";
import createNewOrder from "../controllers/orderController.js";

const ordersRouter = Router();

ordersRouter.post("/orders", validateSchema(orderSchema), createNewOrder);

export default ordersRouter;
