import type { CampgroundDocument } from '$lib/server/mongo/document';

import type { ObjectId } from 'mongoose';

import { Review } from '$lib/server/mongo/document';

import { deleteReviewFromCampground } from './internal/repository';

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

export async function deleteReview(searchParams: {
	campgroundId: string | ObjectId;
	reviewId: string | ObjectId;
}) {
	const { campgroundId, reviewId } = searchParams;
	await deleteReviewFromCampground({ campgroundId, reviewId });
	return Review.findByIdAndDelete(reviewId);
}
