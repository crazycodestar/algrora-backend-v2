import jwt from "jsonwebtoken";
import {
	ACCESS_TOKEN_SECRET,
	REFRESH_TOKEN_SECRET,
} from "../config/environment";

const generateAccessToken = (id: number) =>
	jwt.sign({ id: id }, ACCESS_TOKEN_SECRET, {
		expiresIn: "1h",
	});

const generateRefreshToken = (id: number) =>
	jwt.sign({ id: id }, REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
export { generateAccessToken, generateRefreshToken };
