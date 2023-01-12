import { Router } from "express";
import validateToken from "../middlewares/authenticationMiddleware.js";
import validateCard from "../middlewares/validateCardMiddleware.js";
import { getCards, createNewCard, deleteCard } from "../controllers/cardController.js";

const cardsRouter = Router();

cardsRouter.get("/cards", validateToken, getCards);
cardsRouter.post("/cards", validateToken, validateCard, createNewCard);
cardsRouter.delete("/cards/:cardId", validateToken, deleteCard);

export default cardsRouter;
