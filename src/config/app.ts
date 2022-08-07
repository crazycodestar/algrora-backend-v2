import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authorization from "../middleware/auth";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(authorization);

export default app;
