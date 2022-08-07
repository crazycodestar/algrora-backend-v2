import dotenv from "dotenv";

import prisma from "./config/prismaConfig";
import redisClient from "./config/redisConfig";
import { PORT } from "./config/environment";
import apolloServer from "./config/graphql";
import app from "./config/app";

dotenv.config();

redisClient.on("error", (err) => console.log("redis client error", err));

const main = async () => {
	const corsOptions = {
		origin: ["http://localhost:8000", "https://studio.apollographql.com"],
		credentials: true,
	};

	await redisClient.connect();
	await apolloServer.start();
	apolloServer.applyMiddleware({ app, cors: corsOptions, path: "/graphql" });
	app.listen(PORT, () => console.log(`listening on port ${PORT}`));
};

main()
	.catch((e) => {
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect;
	});
