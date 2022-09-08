import { Prisma, User, Product } from "@prisma/client";

type model =
	| Prisma.UserDelegate<
			Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
	  >
	| Prisma.ProductDelegate<
			Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
	  >;

type paginationType = {
	page: number;
	limit: number;
};

type resultType = {
	previous?: paginationType;
	next?: paginationType;
	result: User[] | Product[] | null;
};

type findManyTypes = {
	skip: number;
	take: number;
};

type universalModelType = {
	count: () => Promise<number>;
	findMany: (args0: findManyTypes) => User[] | Product[];
};

const paginate = async (model: model, page: number, limit: number) => {
	// const baseModel = model as Prisma.UserDelegate<
	// 	Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
	// >;

	const baseModel = model as unknown as universalModelType;

	const skip = (page - 1) * limit;
	const endIndex = page * limit;

	let result: resultType = { result: null };

	const count = await baseModel.count();

	if (endIndex < count) {
		result.next = {
			page: page + 1,
			limit,
		};
	}

	if (skip > 0) {
		result.previous = {
			page: page - 1,
			limit,
		};
	}

	result.result = await baseModel.findMany({
		skip,
		take: limit,
	});

	return result;
};

export { paginate };
