import generateCookiesMiddleware from "../middleware/cookies";

type cookieClientType = ReturnType<typeof generateCookiesMiddleware>;

export interface Icontext {
	userData: string;
	cookieClient: cookieClientType;
}
