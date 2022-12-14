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
import { REFRESH_TOKEN_SECRET } from "../config/environment";
import { IContext, roles } from "../interface/common";

type loginInput = {
	userInput: {
		username: string;
		password: string;
	};
};

type tokenObject = { id: number; roles: Array<roles> };

export default {
	Query: {
		getAccessToken: async (_: any, __: any, { cookieClient }: IContext) => {
			const refreshToken = cookieClient.getCookie("jwt");
			if (!refreshToken) throw new AuthenticationError("unauthorized access");

			let user;

			try {
				user = (await jwt.verify(
					refreshToken,
					REFRESH_TOKEN_SECRET
				)) as tokenObject;
				const data = await redisClient.get((user as tokenObject).id.toString());
				if (data !== refreshToken) throw new ForbiddenError("Forbidden");
			} catch (err) {
				throw new ForbiddenError("forbidden");
			}

			const accessToken = generateAccessToken(user.id, user.roles);
			return { accessToken };
		},
	},
	Mutation: {
		login: async (
			_: any,
			{ userInput }: loginInput,
			{ cookieClient }: IContext
		) => {
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

			const accessToken = generateAccessToken(user.id, ["USER"]);
			const refreshToken = generateRefreshToken(user.id, ["USER"]);

			const expiresIn = 24 * 60 * 60;
			redisClient.setEx(user.id.toString(), expiresIn, refreshToken);

			cookieClient.setCookie({
				key: "jwt",
				value: refreshToken,
				expiresIn,
				ishttpOnly: true,
			});
			return {
				status: 200,
				message: "login in successful",
				success: true,
				auth: accessToken,
			};
		},
		logout: async (_: any, __: any, { cookieClient }: IContext) => {
			const refreshToken = cookieClient.getCookie("jwt");
			if (!refreshToken) return true;

			try {
				const user = await jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
				if (user) await redisClient.del((user as tokenObject).id.toString());

				cookieClient.clearCookie({ key: "jwt", isHttpOnly: true });
				return true;
			} catch (err) {
				cookieClient.clearCookie({ key: "jwt", isHttpOnly: true });
				return true;
			}
		},
	},
};
