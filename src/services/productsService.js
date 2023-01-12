import * as productRepository from "../repositories/productRepository.js";

// eslint-disable-next-line import/prefer-default-export
export async function getProducts() {
  const products = await productRepository.findMany();

  return products;
}
