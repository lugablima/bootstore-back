import { createCard, findCard, deleteOneCard } from "../database/dbManager.js";
import * as cardsService from "../services/cardsService.js";

export async function getCards(req, res) {
  const { user } = res.locals;

  const cards = await cardsService.findCards(user);

  res.status(200).send(cards);
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

export async function deleteCard(req, res) {
  const { user } = res.locals;
  const { cardId } = req.params;

  try {
    const card = await findCard(cardId, user);

    if (!card) return res.status(401).send("Invalid user or card!");

    await deleteOneCard(card);

    res.sendStatus(200);
  } catch (err) {
    console.error("Error deleting user card", err.message);
    res.sendStatus(500);
  }
}
