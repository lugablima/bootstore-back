import "./setup.js";
import express, { json } from "express";
import cors from "cors";
import authRouter from "./routes/authRouter.js";

const app = express();
app.use(cors(), json());
app.use(authRouter);

app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`));
