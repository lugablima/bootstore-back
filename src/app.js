import express, { json } from "express";
import cors from "cors";
import router from "./routes/index.js";

const app = express();
app.use(cors(), json());
app.use(router);

export default app;