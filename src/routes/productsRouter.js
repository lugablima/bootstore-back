import { Router } from "express";

import validateProduct from "../middlewares/validateProductMiddleware.js";

import { registerProduct, findProduct, getProducts } from "../controllers/productsController.js";

const productsRouter = Router();

productsRouter.post("/product", validateProduct, registerProduct);
productsRouter.get("/products", getProducts);
productsRouter.get("/product/:productId", findProduct);

export default productsRouter;
