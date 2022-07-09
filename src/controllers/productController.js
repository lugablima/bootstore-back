import { createProduct, findProductById, listProducts } from "../database/dbManager.js";

export async function registerProduct(req, res, next) {
  try {
    const { product } = res.locals;

    await createProduct(product);

    res.sendStatus(201);
  } catch (err) {
    console.error("Error while registering a new product", err.message);
    next(err);
  }
}

export async function findProduct(req, res, next) {
  try {
    const { productId } = req.params;
    const product = await findProductById(productId);

    res.status(200).send(product);
  } catch (err) {
    console.error("Error while searching for a product", err.message);
    next(err);
  }
}

export async function getProducts(req, res, next) {
  try {
    const products = await listProducts();

    res.status(200).send(products);
  } catch (err) {
    console.error("Error while getting products", err.message);
    next(err);
  }
}
