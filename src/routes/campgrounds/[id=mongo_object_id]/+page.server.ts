import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { Types } from 'mongoose';
import { Campground } from '$lib/server/mongo/document';
import { StatusCodes } from 'http-status-codes';

// TODO: extract this to repository
export const load = (async ({ params }) => {
	const campgrounds = await Campground.aggregate([
		{
			$match: {
				_id: new Types.ObjectId(params.id)
			}
		},
		{
			$lookup: {
				from: 'reviews',
				localField: 'reviews',
				foreignField: '_id',
				as: 'reviews'
			}
		},
		{
			$project: {
				_id: { $toString: '$_id' },
				title: 1,
				price: 1,
				description: 1,
				image: 1,
				location: 1,
				reviews: {
					$map: {
						input: '$reviews',
						as: 'review',
						in: {
							_id: {
								$toString: '$$review._id'
							},
							body: '$$review.body',
							rating: '$$review.rating',
							createdDate: '$$review.createdDate'
						}
					}
				}
			}
		}
	]).limit(1);

	const campground = campgrounds[0];

	if (!campground) error(StatusCodes.NOT_FOUND, { message: 'Campground not found' });

	return {
		campground
	};
}) satisfies PageServerLoad;
