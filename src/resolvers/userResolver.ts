import { DataConflictError } from "../errors";
import { signUpValidation } from "../validation/userValidation";
import { UserInputError, ForbiddenError } from "apollo-server-express";
import { addUser } from "../models/user";
import prisma from "../config/prismaConfig";
import { NotFoundError } from "@prisma/client/runtime";

type addUserInput = {
	userInput: {
		username: string;
		email: string;
		password: string;
		address: string;
	};
};

type registerInput = {
	userInput: {
		email: string;
	};
};

export default {
	Mutation: {
		signUp: async (_: any, { userInput }: addUserInput) => {
			try {
				await signUpValidation.validateAsync(userInput);
			} catch (err) {
				throw new UserInputError("invalid arguement value");
			}
			try {
				const user = await addUser(userInput);
				console.log("user", user);
				return { status: 201 };
			} catch (err) {
				throw new DataConflictError("This user already exists");
			}
		},

		register: async (_: any, { userInput: { email } }: registerInput) => {
			const user = await prisma.user.findUnique({
				where: {
					email,
				},
			});
			if (!user) throw new NotFoundError("Invalid Email");
			if (user.activated)
				throw new ForbiddenError(
					"You have lost access to the page because your account has already been activated"
				);

			// send activation email
			return { status: 201 };
		},
	},
};
