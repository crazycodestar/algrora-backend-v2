import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

import { DataConflictError } from "../errors";
import prisma from "../config/prismaConfig";

type addUserInput = {
	username: string;
	email: string;
	password: string;
	address: string;
};

export const addUser = async (userData: addUserInput) => {
	const { username, email, password, address } = userData;
	const encryptedPassword = await bcrypt.hash(password, 10);

	try {
		const user = await prisma.user.create({
			data: {
				username,
				email,
				password: encryptedPassword,
				address,
				roles: {
					create: [
						{
							role: {
								create: {
									role: "USER",
								},
							},
						},
					],
				},
			},
		});
		return user;
	} catch (err) {
		if (err instanceof Prisma.PrismaClientKnownRequestError) {
			if (err.code === "P2002") {
				const duplicateInfo = (err.meta?.target as string).split("_")[1];
				throw new DataConflictError("user already exists", {
					argumentName: duplicateInfo,
				});
			}
		}
		return console.log(err);
	}
};

export const activateUser = async (id: number) => {
	try {
		return await prisma.user.update({
			where: {
				id,
			},
			data: {
				activated: true,
			},
		});
	} catch (err) {
		return console.log(err);
	}
};

export const findUser = async (username: string) => {
	return await prisma.user.findFirst({
		where: {
			OR: [{ username }, { email: username }],
		},
	});
};
