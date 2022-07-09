import cardValidator from "card-validator";
import newCardSchema from "../schemas/cardSchema.js";
import { cardAlreadyExist } from "../database/dbManager.js";

export default async function validateCard(req, res, next) {
  const { user } = res.locals;
  const card = req.body;

  const { error } = newCardSchema.validate(card, { abortEarly: false });

  if (error) {
    return res.status(422).send(error.details.map((err) => ({ message: err.message })));
  }

  card.card_number = card.card_number.trim();
  card.owner_name = card.owner_name.trim();

  const numberValidation = cardValidator.number(card.card_number);
  const expirationDate = cardValidator.expirationDate(card.validity);
  const cvv = cardValidator.cvv(card.security_code);

  const isValidCard =
    numberValidation.isPotentiallyValid &&
    numberValidation.isValid &&
    expirationDate.isPotentiallyValid &&
    cvv.isPotentiallyValid &&
    cvv.isValid;

  if (!isValidCard) return res.status(422).send("Invalid card!");

  const cardExists = await cardAlreadyExist(user._id, card.card_number);

  if (cardExists) return res.status(409).send("This card is already registered!");

  res.locals = { card, user };

  next();
}
