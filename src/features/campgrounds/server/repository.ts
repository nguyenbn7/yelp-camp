import type { ObjectId } from 'mongoose';
import type { CampgroundSchema } from '$lib/server/mongo/document';

import { Campground } from '$lib/server/mongo/document';

export type CampgroundObject = Omit<CampgroundSchema & { id: string }, 'reviews'>;

export async function findCampgrounds() {
	const campgrounds = await Campground.find()
		.select({
			title: 1,
			price: 1,
			description: 1,
			location: 1,
			image: 1
		})
		.transform((doc) => {
			return doc.map(
				(d) =>
					d.toObject({
						flattenObjectIds: true,
						transform(_doc, ret) {
							const { _id, ...data } = ret;
							return {
								id: _id,
								...data
							};
						}
					}) as unknown as CampgroundObject
			);
		});

	return campgrounds;
}

export async function createCampground(data: {
	title: string;
	description: string;
	price: number;
	location: string;
	image: string;
}) {
	const campground = new Campground(data);

	await campground.save();

	return campground.toObject<CampgroundObject>({
		flattenObjectIds: true,
		transform(_doc, ret) {
			const { _id, ...data } = ret;
			return {
				id: _id,
				...data
			};
		}
	});
}

export async function findCampgroundById(searchParams: { id: string }) {
	const { id } = searchParams;

	const campground = await Campground.findById(id).select({
		title: 1,
		price: 1,
		description: 1,
		image: 1,
		location: 1
	});

	if (!campground) return;

	return campground.toObject<CampgroundObject>({
		flattenObjectIds: true,
		transform(_doc, ret) {
			const { _id, ...data } = ret;
			return {
				id: _id,
				...data
			};
		}
	});
}

export async function findCampgroundByIdAndUpdate(
	searchParams: { id: string },
	data: {
		title: string;
		description: string;
		price: number;
		location: string;
		image: string;
	}
) {
	const { id } = searchParams;

	const campground = await Campground.findByIdAndUpdate(id, data);

	if (!campground) return;

	return campground.toObject<CampgroundObject>({
		flattenObjectIds: true,
		transform(_doc, ret) {
			const { _id, ...data } = ret;
			return {
				id: _id,
				...data
			};
		}
	});
}

export async function deletesCampground(searchParams: { id: string | ObjectId }) {
	const { id } = searchParams;
	return Campground.findByIdAndDelete(id);
}
