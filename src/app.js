import express, { json } from "express";
import cors from "cors";
import "express-async-errors";
import handleApplicationErrors from "./middlewares/errorHandlingMiddleware.js";
import router from "./routes/index.js";

const app = express();
app.use(cors(), json());
app.use(router);
app.use(handleApplicationErrors);

export default app;
