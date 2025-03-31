import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formCampgroundSchema } from '$features/campgrounds/schemas';
import { Campground } from '$features/campgrounds/document';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(formCampgroundSchema.omit({ id: true })));

	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(formCampgroundSchema.omit({ id: true })));

		if (!form.valid) return fail(400, { form });

		const { title, description, image, location, price } = form.data;

		const campground = new Campground({
			title,
			description,
			image,
			location,
			price
		});

		await campground.save();

		redirect(303, `/campgrounds/${campground._id}`);
	}
} satisfies Actions;
