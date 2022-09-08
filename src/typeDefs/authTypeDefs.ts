import { gql } from "apollo-server-express";

const authTypeDefs = gql`
	type Auth {
		accessToken: String!
	}
	input LoginInput {
		username: String!
		password: String!
	}
	extend type Query {
		getAccessToken: Auth!
	}

	type LoginMutationResponse implements ReturnMessage {
		status: Int!
		success: Boolean!
		message: String!
		auth: Auth!
	}

	extend type Mutation {
		login(userInput: LoginInput): LoginMutationResponse!
		logout: Boolean!
	}
`;

export default authTypeDefs;
