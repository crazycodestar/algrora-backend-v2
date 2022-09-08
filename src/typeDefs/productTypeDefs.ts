import { gql } from "apollo-server-express";

const productTypeDefs = gql`
	type Product {
		name: String!
		isOrder: Boolean!
		hasPreOrder: Boolean!
		basePrice: Int!
		imageUri: String!
		# store: Store!
		productContents: [ProductContent!]!
	}

	type ProductContent {
		name: String!
		price: Int!
		options: [ProductContentOption!]!
	}

	type ProductContentOption {
		name: String!
		options: [KeyValuePair!]!
	}

	type KeyValuePair {
		key: String!
		amount: Int!
		description: String
		isPreOrder: Boolean!
	}

	input ProductInput {
		name: String!
		isOrder: Boolean!
		hasPreOrder: Boolean!
		basePrice: Int!
		imageUri: String!
		productContents: [ProductContentInput!]!
	}

	input ProductContentInput {
		name: String!
		price: Int!
		options: [ProductContentOptionsInput!]!
	}

	input ProductContentOptionsInput {
		name: String!
		options: [KeyValuePairInput!]!
	}

	input KeyValuePairInput {
		key: String!
		amount: Int!
		description: String
		isPreOrder: Boolean!
	}

	input UpdateProductInput {
		index: ID
		productInput: ProductInput
	}

	input DeleteProductInput {
		index: ID
	}

	type ProductMutationResponse implements ReturnMessage {
		status: Int!
		success: Boolean!
		message: String!
		product: Product!
	}

	input GetProductsInput {
		page: Int!
		limit: Int!
	}

	type GetProductResponse implements PaginationResponse {
		previous: PaginationInfo
		next: PaginationInfo
		products: [Product!]!
	}

	extend type Query {
		getProducts(userInput: GetProductsInput): GetProductResponse!
	}

	extend type Mutation {
		createProduct(userInput: ProductInput): ProductMutationResponse!
		updateProduct(userInput: UpdateProductInput): ProductMutationResponse!
		deleteProduct(userInput: DeleteProductInput): ProductMutationResponse!
	}
`;

export default productTypeDefs;
