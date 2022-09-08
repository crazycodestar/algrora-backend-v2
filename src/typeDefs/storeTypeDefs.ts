import { gql } from "apollo-server-express";

const storeTypeDefs = gql`
	type Store {
		name: String
		product: [Product!]!
		# orders: [Order!]!
		# logs: [Log!]!
		isActive: Boolean
		preOrderExp: DateTime
		orderExp: DateTime
	}

	input GetStoreInput {
		id: ID
	}

	input DeleteStoreInput {
		id: ID
	}

	type StoreMutationResponse implements ReturnMessage {
		status: Int!
		success: Boolean!
		message: String!
	}

	input StoreInput {
		isActive: Boolean
		preOrderExp: DateTime
		orderExp: DateTime
	}

	input UpdateStoreInput {
		id: ID
		store: StoreInput
	}

	extend type Query {
		getStore(userInput: GetStoreInput): Store!
		getMyStore: Store!
	}

	extend type Mutation {
		requestCreateStore: StoreMutationResponse!
		createStore: StoreMutationResponse!
		updateStore(userInput: UpdateProductInput): StoreMutationResponse!
		deleteStore(userInput: DeleteStoreInput): StoreMutationResponse!
	}
`;

export default storeTypeDefs;
