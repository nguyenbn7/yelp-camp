import type { CampgroundDocument, ReviewSchema } from '$lib/server/mongo/document';

import { Review } from '$lib/server/mongo/document';

import { deleteReviewFromCampground } from './internal/repository';

export async function findReviews(campground: CampgroundDocument) {
	const reviewIds = campground.reviews.map((v) => v._id);

	type ReviewObject = ReviewSchema & { id: string };

	const reviews = await Review.aggregate<ReviewObject>([
		{
			$match: {
				_id: {
					$in: reviewIds
				}
			}
		},
		{
			$addFields: {
				id: { $toString: '$_id' }
			}
		},
		{
			$project: {
				_id: 0,
				id: 1,
				body: 1,
				rating: 1,
				createdDate: 1
			}
		}
	]);

	return reviews;
}
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

export async function deleteReview(searchParams: { campgroundId: string; reviewId: string }) {
	const { campgroundId, reviewId } = searchParams;

	await deleteReviewFromCampground({ campgroundId, reviewId });

	return Review.findByIdAndDelete(reviewId);
}
