import authResolvers from "./authResolver";
import userResolver from "./userResolver";
import productResolver from "./productResolver";
import storeResolver from "./storeResolver";
import scalarResolver from "./scalar";

export default [
	authResolvers,
	userResolver,
	storeResolver,
	productResolver,
	scalarResolver,
];
