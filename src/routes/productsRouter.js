import { Router } from "express";
import validateSchema from "../middlewares/schemaValidator.js";
import productSchema from "../schemas/productSchema.js";
import { registerProduct, findProduct, getProducts } from "../controllers/productsController.js";

const productsRouter = Router();

productsRouter.post("/products", validateSchema(productSchema), registerProduct);
productsRouter.get("/products", getProducts);
productsRouter.get("/products/:productId", findProduct);

export default productsRouter;
