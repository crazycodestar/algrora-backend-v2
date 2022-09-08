import express from "express";
import cookieParser from "cookie-parser";
import authorization from "../middleware/auth";

import authRoute from "../routes/auth";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(authorization);

app.use("/auth", authRoute);

export default app;
