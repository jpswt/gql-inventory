import { readFile } from 'node:fs/promises';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// import { resolvers } from './resolvers.js';
import { Query } from './resolvers/Query.js';
import { Category } from './resolvers/Category.js';
import { Product } from './resolvers/Product.js';
import { categories, products, reviews } from './data/data.js';

const PORT = 9000;
const typeDefs = await readFile('./schema.graphql', 'utf8');
// console.log(categories, products);

const server = new ApolloServer({
	typeDefs,
	// resolvers,
	resolvers: {
		Query,
		Product,
		Category,
	},
});

const { url } = await startStandaloneServer(server, {
	context: async () => ({
		categories,
		products,
		reviews,
	}),
});

console.log(`server at ${url}graphql`);

// app.listen({ port: PORT }, () => {
// 	console.log(`Server running on port ${PORT}`);
// 	console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
// });
