import { Campground } from '$lib/server/mongo/document';

import { Types } from 'mongoose';

export async function findCampgroundById(searchParams: { id: string }) {
	const { id } = searchParams;
	return Campground.findById(id);
}

export async function deleteReviewFromCampground(searchParams: {
	campgroundId: string;
	reviewId: string;
}) {
	const { campgroundId, reviewId } = searchParams;

	return Campground.findByIdAndUpdate(campgroundId, {
		$pull: {
			reviews: new Types.ObjectId(reviewId)
		}
	});
}
