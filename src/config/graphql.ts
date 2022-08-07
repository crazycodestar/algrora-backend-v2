import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";

import resolvers from "../resolvers";
import typeDefs from "../typeDefs";

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

const apolloServer = new ApolloServer({
	schema: schema,
	csrfPrevention: true,
	cache: "bounded",
	context: ({ req, res }) => {
		return { userData: req.user, req, res };
	},
});

export default apolloServer;
