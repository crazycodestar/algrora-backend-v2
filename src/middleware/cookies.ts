import { Request, Response } from "express";

interface IgenerateCookiesMiddlewareInput {
	req: Request;
	res: Response;
}

interface ISetCookieInput {
	key: string;
	value: string;
	ishttpOnly: boolean;
	expiresIn: number;
}

interface IClearCookieInput {
	key: string;
	isHttpOnly: boolean;
}

const generateCookiesMiddleware = ({
	req,
	res,
}: IgenerateCookiesMiddlewareInput) => ({
	getCookie: (key: string): null | string => {
		const cookies = req.cookies;
		if (cookies[key]) return null;
		return cookies[key];
	},
	setCookie: ({ key, value, ishttpOnly, expiresIn }: ISetCookieInput) => {
		return res.cookie(key, value, {
			httpOnly: ishttpOnly,
			maxAge: expiresIn * 1000,
		});
	},
	clearCookie: ({ key, isHttpOnly }: IClearCookieInput) => {
		return res.clearCookie(key, { httpOnly: isHttpOnly });
	},
});

export default generateCookiesMiddleware;
