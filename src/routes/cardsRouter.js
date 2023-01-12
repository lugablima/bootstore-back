import { Router } from "express";
import validateCard from "../middlewares/validateCardMiddleware.js";
import { getCards, createNewCard, deleteCard } from "../controllers/cardController.js";

const cardsRouter = Router();

cardsRouter.get("/cards", getCards);
cardsRouter.post("/cards", validateCard, createNewCard);
cardsRouter.delete("/cards/:cardId", deleteCard);

export default cardsRouter;
