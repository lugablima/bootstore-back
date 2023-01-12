import { Router } from "express";
import validateToken from "../middlewares/authenticationMiddleware.js";
import authRouter from "./authRouter.js";
import productsRouter from "./productsRouter.js";
import cardsRouter from "./cardsRouter.js";
import ordersRouter from "./ordersRouter.js";

const router = Router();

router.use(authRouter);
router.use(productsRouter);

router.use(validateToken);
router.use(cardsRouter);
router.use(ordersRouter);

export default router;
