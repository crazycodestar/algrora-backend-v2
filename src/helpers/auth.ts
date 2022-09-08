import jwt from "jsonwebtoken";
import {
	ACCESS_TOKEN_SECRET,
	REFRESH_TOKEN_SECRET,
} from "../config/environment";
import { roles } from "../interface/common";

const generateAccessToken = (id: number, roles: Array<roles>) =>
	jwt.sign({ id, roles }, ACCESS_TOKEN_SECRET, {
		expiresIn: "1h",
	});

const generateRefreshToken = (id: number, roles: Array<roles>) =>
	jwt.sign({ id, roles }, REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
export { generateAccessToken, generateRefreshToken };
