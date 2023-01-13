import * as cardsService from "../services/cardsService.js";

export async function getCards(req, res) {
  const { user } = res.locals;

  const cards = await cardsService.findCards(user);

  res.status(200).send(cards);
}

export async function createCard(req, res) {
  const { user } = res.locals;
  const card = req.body;

  await cardsService.createCard(user._id, card);

  res.status(201).send("Card successfully registered.");
}

export async function deleteCard(req, res) {
  const { user } = res.locals;
  const { cardId } = req.params;

  await cardsService.deleteCard(user._id, cardId);

  res.sendStatus(200);
}
