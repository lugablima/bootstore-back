import { findProductById } from "../database/dbManager.js";
import * as productsService from "../services/productsService.js";

export async function registerProduct(req, res) {
  const product = req.body;

  await productsService.registerProduct(product);

  res.status(201).send("Product successfully registered.");
}

export async function findProduct(req, res) {
  const { productId } = req.params;
  const product = await findProductById(productId);

  res.status(200).send(product);
}

export async function getProducts(req, res) {
  const products = await productsService.getProducts();

  res.status(200).send(products);
}
