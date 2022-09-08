import { IContext } from "../interface/common";
import {
	createProduct,
	getProducts,
	getProductType,
	IProduct,
} from "../models/product";
import { AuthenticationError, ForbiddenError } from "apollo-server-express";

type getProductsInput = {
	userInput: getProductType;
};

type createProductInput = {
	userInput: IProduct;
};

export default {
	Query: {
		getProducts: async (_: any, { userInput }: getProductsInput) => {
			console.log("working on it ");
			const { page, limit } = userInput;

			const products = await getProducts({ page, limit });
			console.log("results", products);
			return products;
		},
	},
	Mutation: {
		createProduct: async (
			_: any,
			{ userInput }: createProductInput,
			{ userData }: IContext
		) => {
			if (!userData) throw new AuthenticationError("unauthorised access");
			const isOwner = Boolean(userData.roles.find((role) => role === "STORE"));
			if (!isOwner)
				throw new ForbiddenError("you aren't permitted to access this route");

			try {
				const product = await createProduct({
					product: userInput,
					id: userData.id,
				});
				return {
					status: 200,
					message: "product created successfully",
					success: true,
					product,
				};
			} catch (err) {
				throw err;
			}
		},
	},
};
