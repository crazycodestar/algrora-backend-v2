import express, { Request } from "express";
import {
	EMAIL_SECRET,
	ROUTE_EXPIRED,
	ROUTE_SUCCESS,
} from "../config/environment";
import { IContext } from "../interface/common";
import jwt from "jsonwebtoken";
import { activateUser } from "../models/user";
import { AuthenticationError } from "apollo-server-express";

const router = express.Router();

type userData = Pick<IContext, "userData">;

const verifyToken = async (token: string) => {
	try {
		return await jwt.verify(token, EMAIL_SECRET);
	} catch (err) {
		throw new Error("expired");
	}
};

router.get("/activate", async (req: Request<{ token: string }>, res) => {
	try {
		const { userData } = verifyToken(req.params.token) as unknown as userData;
		if (!userData) throw new AuthenticationError("unable to authorised");
		const user = await activateUser(userData.id);

		if (user) return res.status(200).redirect(ROUTE_SUCCESS);
		return res.status(401).redirect(ROUTE_EXPIRED);
	} catch (err) {
		res.status(401).redirect(ROUTE_EXPIRED);
	}
});

export default router;
