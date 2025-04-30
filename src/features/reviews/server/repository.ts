import type { CampgroundDocument } from '$lib/server/mongo/document';
import { Review } from '$lib/server/mongo/document';

export async function createReview(
	campground: CampgroundDocument,
	data: { body: string; rating: number }
) {
	// TODO: transactions maybe?
	const review = new Review(data);

	campground.reviews.push(review);

	await review.save();
	await campground.save();

	return review.toObject();
}
