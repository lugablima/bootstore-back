import { Router } from "express";
import authRouter from "./authRouter.js";
import cardsRouter from "./cardsRouter.js";
import ordersRouter from "./ordersRouter.js";
import productsRouter from "./productRouter.js";

const router = Router();

router.use(authRouter);
router.use(cardsRouter);
router.use(ordersRouter);
router.use(productsRouter);

export default router;
