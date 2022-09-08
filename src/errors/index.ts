import { ApolloError } from "apollo-server-errors";

export class DataConflictError extends ApolloError {
	constructor(message: string, extensions?: Record<string, any>) {
		super(message, "DATA_CONFLICT_ERROR", extensions);

		Object.defineProperty(this, "name", { value: "DataConflictError" });
	}
}

export class NotFoundError extends ApolloError {
	constructor(message: string, extensions?: Record<string, any>) {
		super(message, "NOT_FOUND_ERROR", extensions);

		Object.defineProperty(this, "name", { value: "NotFoundError" });
	}
}

export class InternalServerError extends ApolloError {
	constructor(message: string, extensions?: Record<string, any>) {
		super(message, "INTERNAL_SERVER_ERROR", extensions);

		Object.defineProperty(this, "name", { value: "internalServerError" });
	}
}
