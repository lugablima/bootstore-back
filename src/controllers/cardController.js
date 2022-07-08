import { findCards } from "../database/dbManager.js";

export async function getCards(req, res) {
  const { user } = res.locals;
  try {
    const cards = await findCards(user);

    res.status(200).send(cards);
  } catch (err) {
    console.error("Error while getting cards of the user", err.message);
    res.sendStatus(500);
  }
}

export function createCard() {}
