import type { Actions, PageServerLoad } from './$types';

import { campgroundSchema } from '$features/campgrounds/schema';
import { createCampground } from '$features/campgrounds/server/repository';

import { StatusCodes } from 'http-status-codes';

import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(campgroundSchema));

	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(campgroundSchema));

		if (!form.valid)
			return message(form, 'Invalid data form. Please check again.', {
				status: StatusCodes.BAD_REQUEST
			});

		const campground = await createCampground(form.data);

		form.message = 'Campground is created';

		return { form, campground };
	}
} satisfies Actions;
