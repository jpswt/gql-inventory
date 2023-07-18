// import { products, categories } from '../data/data.js';

export const Query = {
	hello: () => {
		return ['Hello', 'World'];
	},

	// No filter applied to products//////
	// products: (parent, args, { products }) => {
	// 	return products;
	// },

	// With filter applied
	products: (parent, { filter }, { products, reviews }) => {
		let filterProducts = products;
		if (filter) {
			const { onSale, avgRating } = filter;
			if (onSale) {
				filterProducts = filterProducts.filter((product) => {
					return product.onSale;
				});
			}
			if ([1, 2, 3, 4, 5].includes(avgRating)) {
				filterProducts = filterProducts.filter((product) => {
					let sumRating = 0;
					let numberOfReviews = 0;
					reviews.forEach((review) => {
						if (review.productId === product.id) {
							sumRating += review.rating;
							numberOfReviews++;
						}
					});
					const avgProductRating = sumRating / numberOfReviews;
					console.log(avgProductRating);
					return avgProductRating >= avgRating;
				});
			}
		}
		console.log('args', filterProducts);
		return filterProducts;
	},

	product: (parent, { id }, { products }) => {
		const product = products.find((product) => product.id === id);
		if (!product) return null;
		return product;
	},
	categories: (parent, args, { categories }) => {
		return categories;
	},
	category: (parent, { id }, { categories }) => {
		return categories.find((cat) => cat.id === id);
	},
};
