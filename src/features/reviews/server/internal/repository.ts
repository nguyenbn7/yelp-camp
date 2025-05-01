import type { ObjectId } from 'mongoose';
import { Campground } from '$lib/server/mongo/document';

export async function findCampgroundById(searchParams: { id: string | ObjectId }) {
	const { id } = searchParams;
	return Campground.findById(id);
}

export async function deleteReviewFromCampground(searchParams: {
	campgroundId: string | ObjectId;
	reviewId: string | ObjectId;
}) {
	const { campgroundId, reviewId } = searchParams;
	return Campground.findByIdAndUpdate(campgroundId, { $pull: { reviews: reviewId } });
}
