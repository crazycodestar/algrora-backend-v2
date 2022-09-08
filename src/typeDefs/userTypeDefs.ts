import { gql } from "apollo-server-express";

export default gql`
	type User {
		id: ID!
		email: String!
		username: String!
		activated: Boolean!
		imageUri: String
		address: String!
		ImageUrl: String
	}
	input SignUpInput {
		username: String!
		email: String!
		password: String!
		address: String!
	}
	input RegisterInput {
		email: String!
	}
	extend type Mutation {
		signUp(userInput: SignUpInput): ReturnMessage
		register(userInput: RegisterInput): ReturnMessage
	}
`;
