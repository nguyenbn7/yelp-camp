import type { ObjectId, PipelineStage } from 'mongoose';
import type { CampgroundSchema } from '$lib/server/mongo/document';

import { Campground } from '$lib/server/mongo/document';

import { Types } from 'mongoose';

export type CampgroundObject = Omit<CampgroundSchema & { id: string }, 'reviews'>;

export type CampgroundObjectWithReviews = CampgroundSchema & {
	id: string;
	reviews: { id: string; body: string; rating: number; createdDate: string }[];
};

const addIdField: PipelineStage.AddFields = {
	$addFields: {
		id: { $toString: '$_id' }
	}
};

const projection: PipelineStage.Project = {
	$project: {
		_id: 0,
		id: 1,
		title: 1,
		price: 1,
		description: 1,
		location: 1,
		image: 1
	}
};

export async function findCampgrounds() {
	return Campground.aggregate<CampgroundObject>([addIdField, projection]);
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

	const matchId: PipelineStage.Match = {
		$match: {
			_id: new Types.ObjectId(id)
		}
	};

	const limit1: PipelineStage.Limit = {
		$limit: 1
	};

	const [campground] = await Campground.aggregate<CampgroundObject>([
		matchId,
		addIdField,
		projection,
		limit1
	]);

	return campground;
}

export async function findCampgroundByIdIncludeReviews(searchParams: { id: string }) {
	const { id } = searchParams;

	const matchId: PipelineStage.Match = {
		$match: {
			_id: new Types.ObjectId(id)
		}
	};

	const limit1: PipelineStage.Limit = {
		$limit: 1
	};

	const joinReviews = {
		$lookup: {
			from: 'reviews',
			localField: 'reviews',
			foreignField: '_id',
			as: 'reviews'
		}
	};

	const extendedProjection: PipelineStage.Project = {
		$project: {
			...projection.$project,
			reviews: {
				$map: {
					input: '$reviews',
					as: 'review',
					in: {
						id: {
							$toString: '$$review._id'
						},
						body: '$$review.body',
						rating: '$$review.rating',
						createdDate: '$$review.createdDate'
					}
				}
			}
		}
	};

	const [campground] = await Campground.aggregate<CampgroundObjectWithReviews>([
		matchId,
		addIdField,
		joinReviews,
		extendedProjection,
		limit1
	]);

	return campground;
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
