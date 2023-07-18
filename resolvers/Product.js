// import { categories } from '../data/data.js';

export const Product = {
	category: (parent, args, { categories }) => {
		const categoryId = parent.categoryId;
		return categories.find((cat) => cat.id === categoryId);
	},
	reviews: (parent, args, { reviews }) => {
		return reviews.filter((review) => parent.id === review.productId);
	},
};
