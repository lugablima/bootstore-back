import express from "express";

import validateProduct from "../middlewares/validateProductMiddleware.js";

import { registerProduct, findProduct, getProducts } from "../controllers/productController.js";

const router = express.Router();

router.post("/product", validateProduct, registerProduct);
router.get("/products", getProducts);
router.get("/product/:productId", findProduct);

export default router;
