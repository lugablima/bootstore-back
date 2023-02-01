import * as productRepository from "../repositories/productRepository.js";

export async function registerProduct(product) {
  await productRepository.insertOne(product);
}

export async function findProduct(productId) {
  const product = await productRepository.findOneById(productId);

  return product;
}

export async function getProducts() {
  const products = await productRepository.findMany();

  return products;
}
