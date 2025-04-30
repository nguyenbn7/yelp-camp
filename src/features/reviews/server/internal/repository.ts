import type { ObjectId } from 'mongoose';
import { Campground } from '$lib/server/mongo/document';

export async function findCampgroundById(searchParams: { id: string | ObjectId }) {
	const { id } = searchParams;
	return Campground.findById(id,);
}
