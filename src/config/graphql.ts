import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";

import resolvers from "../resolvers";
import typeDefs from "../typeDefs";
import { Icontext } from "../interface/common";
import generateCookiesMiddleware from "../middleware/cookies";

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

const apolloServer = new ApolloServer({
	schema: schema,
	csrfPrevention: true,
	cache: "bounded",
	context: ({ req, res }): Icontext => {
		const cookieClient = generateCookiesMiddleware({ req, res });
		return { userData: req.user, cookieClient };
	},
});

export default apolloServer;
