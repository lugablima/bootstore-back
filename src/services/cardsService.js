import * as cardRepository from "../repositories/cardRepository.js";

// eslint-disable-next-line import/prefer-default-export
export async function findCards(user) {
  const cards = await cardRepository.findMany({ userId: user._id });

  return cards;
}
