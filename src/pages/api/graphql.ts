import type { NextApiRequest, NextApiResponse } from "next";
import { ApolloServer, gql } from "apollo-server-micro";
import {
	processRequest,
	GraphQLUpload,
	GraphQLOperation,
} from "graphql-upload";
import typeDefs from "../../lib/typeDefs";

const resolvers = {
	Upload: GraphQLUpload,
	Query: {
		hello: () => "Hello world!",
	},
	Mutation: {
		singleUpload: async (_req: any, { file }: { file: any }) => {
			console.log(file);
			return false;
		},
	},
};

export const config = {
	api: {
		bodyParser: false,
	},
};

const apollo = new ApolloServer({
	typeDefs,
	resolvers,
	uploads: false,
});
apollo.start();

const handler = async (
	req: NextApiRequest & { filePayload?: GraphQLOperation | GraphQLOperation[] },
	res: NextApiResponse
) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("access-control-allow-methods", "POST");
	const contentType = req.headers["content-type"];
	if (contentType && contentType.startsWith("multipart/form-data")) {
		req.filePayload = await processRequest(req, res);
	}
	const server = apollo.createHandler({ path: "/api/graphql" });
	await server(req, res);
};

export default handler;
// https://github.com/jaydenseric/graphql-upload/issues/160#issuecomment-822729490
