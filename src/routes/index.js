import { Router } from "express";
import authRouter from "./authRouter";
import cardsRouter from "./cardsRouter";
import ordersRouter from "./ordersRouter";
import productsRouter from "./productRouter";

const router = Router();

router.use(authRouter);
router.use(cardsRouter);
router.use(ordersRouter);
router.use(productsRouter);

export default router;
