export const resolvers = {
	Query: {
		hello: () => {
			return ['Hello', 'World'];
		},

		products: () => {
			return products;
		},

		// product: (parent, args, context) => {
		// 	const parentId = args.id;
		// 	const product = products.find((product) => product.id === parentId);
		// 	if (!product) return null;
		// 	return product;
		// },
		product: (_root, { id }) => {
			const product = products.find((product) => product.id === id);
			if (!product) return null;
			return product;
		},
		categories: () => {
			return categories;
		},
		category: (_root, { id }) => {
			return categories.find((cat) => cat.id === id);
		},
	},
	// add this for one to many relationship with category to products
	Category: {
		products: (parent, args, context) => {
			console.log(parent);
			return products.filter((product) => product.categoryId === parent.id);
		},
	},
	//add this for many to one relationship to find the category for each product
	Product: {
		category: (parent, args, context) => {
			console.log('parent', parent);
			console.log('args', args);
			const categoryId = parent.categoryId;
			return categories.find((cat) => cat.id === categoryId);
		},
	},
};
