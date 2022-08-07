import { NotFoundError } from "@prisma/client/runtime";
import {
	AuthenticationError,
	UserInputError,
	ForbiddenError,
} from "apollo-server-express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { findUser } from "../models/user";
import { generateAccessToken, generateRefreshToken } from "../helpers/auth";
import { loginValidation } from "../validation/authValidation";
import redisClient from "../config/redisConfig";
import { Request, Response } from "express";
import { REFRESH_TOKEN_SECRET } from "../config/environment";

type loginInput = {
	userInput: {
		username: string;
		password: string;
	};
};

type context = {
	res: Response;
	req: Request;
};

type tokenObject = { id: number };

export default {
	Query: {
		getAccessToken: async (_: any, __: any, { req }: context) => {
			const cookies = req.cookies;

			if (!cookies?.jwt) throw new AuthenticationError("unauthorized access");
			const refreshToken: string = cookies.jwt;
			let user;

			try {
				user = await jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
				const data = await redisClient.get((user as tokenObject).id.toString());
				if (data !== refreshToken) throw new ForbiddenError("Forbidden");
			} catch (err) {
				throw new ForbiddenError("forbidden");
			}

			const accessToken = generateAccessToken((user as tokenObject).id);
			return { accessToken };
		},
	},
	Mutation: {
		login: async (_: any, { userInput }: loginInput, { res }: context) => {
			const { username, password } = userInput;
			try {
				await loginValidation.validateAsync(userInput);
			} catch (err) {
				throw new UserInputError("invalid username or password", {
					details: err,
				});
			}

			const user = await findUser(username);
			if (!user) throw new NotFoundError("user not found");

			const match = bcrypt.compare(password, user.password);
			if (!match) throw new UserInputError("invalid username or password");

			const accessToken = generateAccessToken(user.id);
			const refreshToken = generateRefreshToken(user.id);

			const expiresIn = 24 * 60 * 60;
			redisClient.setEx(user.id.toString(), expiresIn, refreshToken);

			console.log(res);
			res.cookie("jwt", refreshToken, {
				httpOnly: true,
				maxAge: expiresIn * 1000,
			});
			return { accessToken };
		},
		logout: async (_: any, __: any, { res, req }: context) => {
			const cookies = req.cookies;
			if (!cookies?.jwt) return true;
			const refreshToken = cookies.jwt;

			try {
				const user = await jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
				if (user) await redisClient.del((user as tokenObject).id.toString());

				res.clearCookie("jwt", { httpOnly: true });
				return true;
			} catch (err) {
				res.clearCookie("jwt", { httpOnly: true });
				return true;
			}
		},
	},
};
