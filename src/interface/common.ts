import generateCookiesMiddleware from "../middleware/cookies";

type cookieClientType = ReturnType<typeof generateCookiesMiddleware>;
export type roles = "ADMIN" | "USER" | "STORE";

export interface IContext {
	userData: null | {
		id: number;
		roles: Array<roles>;
	};
	cookieClient: cookieClientType;
}
