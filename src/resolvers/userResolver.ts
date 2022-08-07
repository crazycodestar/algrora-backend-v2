import { registerValidation } from "../validation/userValidation";
import { addUser } from "../models/user";
import { UserInputError } from "apollo-server-express";

type addUserInput = {
	userInput: {
		username: string;
		email: string;
		password: string;
		address: string;
	};
};

export default {
	Mutation: {
		addUser: async (_: any, { userInput }: addUserInput, { userData }: any) => {
			try {
				await registerValidation.validateAsync(userInput);
			} catch (err) {
				throw new UserInputError("invalid arguement value");
			}
			try {
				await addUser(userInput);
			} catch (err) {
				throw err;
			}
		},
	},
};
