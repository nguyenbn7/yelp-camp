import type { PageServerLoad } from './$types';

import { findCampgroundByIdIncludeReviews } from '$features/campgrounds/server/repository';

import { StatusCodes } from 'http-status-codes';

import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	const campground = await findCampgroundByIdIncludeReviews({ id: params.id });

	if (!campground) error(StatusCodes.NOT_FOUND, { message: 'Campground not found' });

	return {
		campground
	};
}) satisfies PageServerLoad;
