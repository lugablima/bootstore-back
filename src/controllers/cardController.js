import { findCards, createCard } from "../database/dbManager.js";

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

export async function createNewCard(req, res) {
  const { user, card } = res.locals;

  try {
    await createCard(user, card);

    res.sendStatus(201);
  } catch (err) {
    console.error("Error while creating a new card for the user", err.message);
    res.sendStatus(500);
  }
}
