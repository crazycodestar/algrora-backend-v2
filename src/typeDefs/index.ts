import { gql } from "apollo-server-express";

import authTypeDefs from "./authTypeDefs";
import userTypeDefs from "./userTypeDefs";

const baseTypeDefs = gql`
	type Query {
		_: String
	}
	type Mutation {
		_: String
	}
`;

export default [baseTypeDefs, authTypeDefs, userTypeDefs];
