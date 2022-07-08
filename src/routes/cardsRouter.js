import { Router } from "express";
import validateToken from "../middlewares/validateTokenMiddleware.js";
import validateCard from "../middlewares/validateCardMiddleware.js";
import { getCards, createNewCard, deleteCard } from "../controllers/cardController.js";

const router = Router();

router.get("/cards", validateToken, getCards);
router.post("/cards", validateToken, validateCard, createNewCard);
router.delete("/cards/:cardId", validateToken, deleteCard);

export default router;
