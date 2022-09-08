import { gql } from "apollo-server-express";

import authTypeDefs from "./authTypeDefs";
import userTypeDefs from "./userTypeDefs";
import productTypeDefs from "./productTypeDefs";
import storeTypeDefs from "./storeTypeDefs";

const baseTypeDefs = gql`
	scalar DateTime
	interface ReturnMessage {
		status: Int!
		success: Boolean!
		message: String!
	}
	type PaginationInfo {
		page: Int!
		limit: Int!
	}
	interface PaginationResponse {
		previous: PaginationInfo
		next: PaginationInfo
	}
	type Query {
		_: String
	}
	type Mutation {
		_: String
	}
`;

export default [
	baseTypeDefs,
	authTypeDefs,
	userTypeDefs,
	productTypeDefs,
	storeTypeDefs,
];
