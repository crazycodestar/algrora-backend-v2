import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT!;
export const SECRET = process.env.SECRET!;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
export const EMAIL_SECRET = process.env.EMAIL_SECRET!;
export const ROUTE_EXPIRED =
	process.env.ROUTE_EXPIRED || "http:localhost:3000/expired";
export const ROUTE_SUCCESS =
	process.env.ROUTE_SUCCESS || "http:localhost:3000/success";

export const ENV = {
	development: process.env.NODE_ENV === "development",
	test: process.env.NODE_ENV === "test",
	staging: process.env.NODE_ENV === "staging",
	production: process.env.NODE_ENV === "production",
};
