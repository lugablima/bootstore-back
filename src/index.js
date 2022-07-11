import "./setup.js";
import express, { json } from "express";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import productRouter from "./routes/productRouter.js";
import cardsRouter from "./routes/cardsRouter.js";
import ordersRouter from "./routes/ordersRouter.js";

const app = express();
app.use(cors(), json());
app.use(authRouter);
app.use(productRouter);
app.use(cardsRouter);
app.use(ordersRouter);

app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`));
