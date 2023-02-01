import cardValidator from "card-validator";
import { ObjectId } from "../database/mongodb.js";
import conflictError from "../errors/conflictError.js";
import unauthorizedError from "../errors/unauthorizedError.js";
import notFoundError from "../errors/notFoundError.js";
import * as cardRepository from "../repositories/cardRepository.js";

function sanitizeCard(card) {
  const sanitizedCard = {
    ...card,
    cardNumber: card.cardNumber.trim(),
    cardholderName: card.cardholderName.trim(),
    description: card.description.trim(),
  };

  return sanitizedCard;
}

function validateCardOrFail(card) {
  const numberValidation = cardValidator.number(card.cardNumber);
  const expirationDate = cardValidator.expirationDate(card.expirationDate);
  const cvv = cardValidator.cvv(card.securityCode);

  const isValidCard =
    numberValidation.isPotentiallyValid &&
    numberValidation.isValid &&
    expirationDate.isPotentiallyValid &&
    cvv.isPotentiallyValid &&
    cvv.isValid;

  if (!isValidCard) {
    throw unauthorizedError("Invalid card.");
  }
}

async function validateIfTheCardDoesNotExist(userId, card) {
  const cardExists = await cardRepository.findOne({ userId, cardNumber: card.cardNumber });

  if (cardExists) {
    throw conflictError("This card is already registered.");
  }
}

export async function validateIfTheCardExists(userId, cardId) {
  const card = await cardRepository.findOne({ _id: new ObjectId(cardId), userId });

  if (!card) {
    throw notFoundError("Card not found.");
  }
}

export async function findCards(user) {
  const cards = await cardRepository.findMany({ userId: user._id });

  return cards;
}

export async function createCard(userId, card) {
  const sanitizedCard = sanitizeCard(card);

  validateCardOrFail(sanitizedCard);

  await validateIfTheCardDoesNotExist(userId, sanitizedCard);

  await cardRepository.insertOne(userId, card);
}

export async function deleteCard(userId, cardId) {
  await validateIfTheCardExists(userId, cardId);

  await cardRepository.deleteOne({ _id: new ObjectId(cardId) });
}
