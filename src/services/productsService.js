import * as productRepository from "../repositories/productRepository.js";

export async function getProducts() {
  const products = await productRepository.findMany();

  return products;
}

export async function registerProduct(product) {
  await productRepository.insertOne(product);
}
