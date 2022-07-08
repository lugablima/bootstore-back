import { Router } from "express";
import validateToken from "../middlewares/validateTokenMiddleware.js";
import { getCards, createCard } from "../controllers/cardController.js";

const router = Router();

router.get("/cards", validateToken, getCards);
router.post("/cards", validateToken, createCard);

export default router;
