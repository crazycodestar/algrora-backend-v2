import { Prisma, ProductContent } from "@prisma/client";
import prisma from "../config/prismaConfig";
import { unwrap } from "../helpers/common";
import { paginate } from "./common";

export type getProductType = {
	page: number;
	limit: number;
};

export type IProduct = {
	name: string;
	isOrder: boolean;
	hasPreOrder: boolean;
	basePrice: number;
	imageUri: string;
	productContents: Array<IProductContent>;
};

type IProductContent = {
	name: string;
	price: number;
	options: Array<IOption>;
};

type IOption = {
	name: string;
	options: Array<IKeyValuePair>;
};

type IKeyValuePair = {
	key: string;
	amount: number;
	isPreOrder: boolean;
};

type ICreateProduct = {
	product: IProduct;
	id: number;
};

export const getProducts = async ({ page, limit }: getProductType) => {
	const results = await paginate(prisma.product, page, limit);
	return {
		...results,
		products: results.result,
	};
};

type subProductContentCreateInput = Pick<
	Prisma.ProductContentCreateInput,
	"name" | "price" | "options"
>;
type subOptionCreateInput = Pick<Prisma.OptionCreateInput, "name" | "options">;
type subKeyValuePairCreateInput = Pick<
	Prisma.KeyValuePairCreateInput,
	"key" | "amount" | "isPreOrder"
>;

export const createProduct = async ({
	product: productInput,
	id,
}: ICreateProduct) => {
	const { productContents: baseProductContents } = productInput;
	const productValues = unwrap(productInput, [
		"name",
		"basePrice",
		"hasPreOrder",
		"imageUri",
		"isOrder",
	]);
	// const productContentValues = unwrap(product.productContents, [""])

	// find a store

	// productcontents
	const productContents = baseProductContents.map(
		(productContent: IProductContent): subProductContentCreateInput => {
			const base = unwrap(productContent, ["name", "price"]) as Pick<
				ProductContent,
				"name" | "price"
			>;
			const baseOptions = productContent.options.map(
				(option: IOption): subOptionCreateInput => {
					const baseKeyValuePair = option.options.map(
						(keyValuePair: IKeyValuePair): subKeyValuePairCreateInput =>
							keyValuePair
					);
					return {
						name: option.name,
						options: {
							create: [...baseKeyValuePair],
						},
					};
				}
			);
			return {
				...base,
				options: {
					create: {
						...baseOptions,
					},
				},
			};
		}
	) as Array<Prisma.ProductContentCreateInput>;

	const product: Prisma.ProductCreateInput = {
		...productValues,
		productContents: {
			create: productContents,
		},
		store: {
			connect: { ownerId: id },
		},
	};

	try {
		return await prisma.product.create({
			data: product,
		});
	} catch (err) {
		console.log(err);
		throw err;
	}
};
