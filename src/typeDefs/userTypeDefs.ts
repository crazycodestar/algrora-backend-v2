import { gql } from "apollo-server-express";

export default gql`
	type User {
		id: ID!
		email: String!
		username: String!
		activated: Boolean!
		address: String!
		ImageUrl: String
	}
	input AddUserInput {
		username: String!
		email: String!
		password: String!
		address: String!
	}
	extend type Mutation {
		addUser(userInput: AddUserInput): User
	}
`;
