import { gql } from "apollo-server-micro";

const typeDefs = gql`
	scalar Upload
	type Query {
		hello: String!
	}
	type Mutation {
		singleUpload(file: Upload!): Boolean
	}
`;

export default typeDefs;
