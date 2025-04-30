import type { Actions, PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { campgroundFormSchema, campgroundIdSchema } from '$features/campgrounds/schema';
import {
	findCampgroundById,
	findCampgroundByIdAndUpdate
} from '$features/campgrounds/server/repository';

export const load = (async ({ params }) => {
	const campground = await findCampgroundById({ id: params.id });

	if (!campground) error(404, { message: 'Campground not found' });

	const form = await superValidate(zod(campgroundFormSchema), {
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
			zod(campgroundFormSchema.extend(campgroundIdSchema.shape))
		);

		if (!form.valid) return fail(400, { form });

		const { id, ...data } = form.data;

		const campground = await findCampgroundByIdAndUpdate({ id }, data);

		if (!campground)
			return message(form, 'Cannot update campground. Please try again', { status: 409 });

		redirect(303, `/campgrounds/${campground._id}`);
	}
} satisfies Actions;
