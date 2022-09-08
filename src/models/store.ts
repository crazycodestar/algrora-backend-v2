import { Prisma } from "@prisma/client";
import prisma from "../config/prismaConfig";
import { DataConflictError } from "../errors";

export const getStore = async (id: number) => {
	return await prisma.store.findFirst({
		where: {
			id,
		},
	});
};

// type storeInput = {
// 	orderExp: Date;
// 	preOrderExp: Date;
// };

export const createStore = async (ownerId: number) => {
	try {
		return await prisma.store.create({
			data: {
				orderExp: new Date("2022-09-05T10:00:33Z"),
				preOrderExp: new Date("2022-09-05T00:00:33Z"),
				ownerId,
			},
		});
	} catch (err) {
		if (err instanceof Prisma.PrismaClientKnownRequestError) {
			throw new DataConflictError("This account already has a store");
		}
		return console.log("problem ooh", err);
	}
};
