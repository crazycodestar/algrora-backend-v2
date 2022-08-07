import { gql } from "apollo-server-express";

const authTypeDefs = gql`
	type auth {
		accessToken: String!
	}
	input LoginInput {
		username: String!
		password: String!
	}
	extend type Query {
		getAccessToken: auth!
	}

	extend type Mutation {
		login(userInput: LoginInput): auth
		logout: Boolean!
	}
`;

export default authTypeDefs;
