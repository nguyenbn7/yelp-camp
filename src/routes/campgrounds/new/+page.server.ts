import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { campgroundFormSchema } from '$features/campgrounds/schema';
import { createCampground } from '$features/campgrounds/server/repository';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(campgroundFormSchema));

	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(campgroundFormSchema));

		if (!form.valid) return fail(400, { form });

		const campground = await createCampground(form.data);

		redirect(303, `/campgrounds/${campground._id}`);
	}
} satisfies Actions;
