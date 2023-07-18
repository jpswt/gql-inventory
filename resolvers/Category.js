// import { products } from '../data/data.js';

export const Category = {
	// products: ({ id: categoryId }, args, { products }) => {
	// 	console.log(categoryId);
	// 	return products.filter((product) => product.categoryId === categoryId);
	// },

	// with filter
	products: ({ id: categoryId }, { filter }, { products, reviews }) => {
		const catProducts = products.filter(
			(product) => product.categoryId === categoryId
		);
		let filteredCatProducts = catProducts;
		if (filter) {
			const { onSale, avgRating } = filter;
			if (onSale) {
				filteredCatProducts = filteredCatProducts.filter((product) => {
					return product.onSale;
				});
			}
			if ([1, 2, 3, 4, 5].includes(avgRating)) {
				filteredCatProducts = filteredCatProducts.filter((product) => {
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

		return filteredCatProducts;
	},
};
