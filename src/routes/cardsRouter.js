import { Router } from "express";
import { getCards, createCard, deleteCard } from "../controllers/cardController.js";
import validateSchema from "../middlewares/schemaValidator.js";
import cardSchema from "../schemas/cardSchema.js";

const cardsRouter = Router();

cardsRouter.get("/cards", getCards);
cardsRouter.post("/cards", validateSchema(cardSchema), createCard);
cardsRouter.delete("/cards/:cardId", deleteCard);

export default cardsRouter;
