import type { Actions, PageServerLoad } from './$types';

import { campgroundSchema, campgroundIdSchema } from '$features/campgrounds/schema';
import {
	findCampgroundById,
	findCampgroundByIdAndUpdate
} from '$features/campgrounds/server/repository';

import { StatusCodes } from 'http-status-codes';

import { error, redirect } from '@sveltejs/kit';

import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = (async ({ params }) => {
	const campground = await findCampgroundById({ id: params.id });

	if (!campground) error(StatusCodes.NOT_FOUND, { message: 'Campground not found' });

	const form = await superValidate(zod(campgroundSchema), {
		defaults: { ...campground }
	});

	return {
		campground,
		form
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(
			request,
			zod(campgroundSchema.extend(campgroundIdSchema.shape))
		);

		if (!form.valid)
			return message(form, 'Invalid data form. Please check again.', {
				status: StatusCodes.BAD_REQUEST
			});

		const { id, ...data } = form.data;

		const campground = await findCampgroundByIdAndUpdate({ id }, data);

		if (!campground)
			return message(form, 'Cannot update campground. Please try again', {
				status: StatusCodes.UNPROCESSABLE_ENTITY
			});

		form.message = 'Campground is updated';

		return { form, campground };
	}
} satisfies Actions;
