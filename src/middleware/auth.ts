import jwt from "jsonwebtoken";
import { NextFunction, Request } from "express";
import { SECRET } from "../config/environment";

const authorization = async (req: Request, _: any, next: NextFunction) => {
	const bearer = req.headers.authorization || "";
	if (!bearer) return next();
	const token = bearer.split(" ")[1];
	try {
		const user = await jwt.verify(token, SECRET);
		req.user = user;
	} catch (err) {
		console.log(err);
	}
	return next();
};

export default authorization;
