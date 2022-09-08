import { createStore, getStore } from "../models/store";
import { DataConflictError, NotFoundError } from "../errors";
import { AuthenticationError, UserInputError } from "apollo-server-express";
import { IContext, roles } from "../interface/common";
import { createStoreValidation } from "../validation/storeValidation";
import { generateAccessToken } from "../helpers/auth";

type getStoreType = {
	userInput: {
		id: number;
	};
};

type createStoreInput = {
	userInput: {
		preOrderExp: Date;
		orderExp: Date;
	};
};

const storeResolver = {
	Query: {
		getStore: async (_: any, { userInput }: getStoreType) => {
			const id = userInput.id;
			const store = await getStore(id);
			if (!store) throw new NotFoundError("store not found");
			return store;
		},
		getMyStore: async (_: any, __: any, { userData }: IContext) => {
			if (!userData) throw new AuthenticationError("unable to authorised");
			const { roles, id } = userData;
			const role = roles.find((role) => role === "STORE");
			if (!role) throw new AuthenticationError("unauthorsed access");

			const store = await getStore(id);
			if (!store) throw new NotFoundError("store not found");
			return store;
		},
	},
	Mutation: {
		createStore: async (
			_: any,
			{ userInput }: createStoreInput,
			{ userData }: IContext
		) => {
			if (!userData) throw new AuthenticationError("unable to authorised");
			const { id, roles } = userData;
			try {
				await createStoreValidation.validateAsync(userInput);
			} catch (err) {
				throw new UserInputError("invalid arguments passed");
			}

			try {
				const store = await createStore(id);

				const newRoles: roles[] = [...roles, "STORE"];
				const accessToken = generateAccessToken(id, newRoles);
				return {
					status: 200,
					message: "store created successful",
					success: true,
					auth: accessToken,
					store,
				};
			} catch (err) {
				throw new DataConflictError(
					"user already has a store please consider updating the store instead"
				);
			}
		},
	},
};

export default storeResolver;
