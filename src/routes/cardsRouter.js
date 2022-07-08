import { Router } from "express";
import validateToken from "../middlewares/validateTokenMiddleware.js";
import validateCard from "../middlewares/validateCardMiddleware.js";
import { getCards, createNewCard } from "../controllers/cardController.js";

const router = Router();

router.get("/cards", validateToken, getCards);
router.post("/cards", validateToken, validateCard, createNewCard);

export default router;
