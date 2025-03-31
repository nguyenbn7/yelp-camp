import type { Actions, PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { Campground } from '$features/campgrounds/document';
import { formCampgroundSchema } from '$features/campgrounds/schemas';

export const load = (async ({ params }) => {
	const campground = await Campground.findById(params.id, {
		_id: { $toString: '$_id' },
		title: 1,
		price: 1,
		description: 1,
		image: 1,
		location: 1
	}).lean();

	if (!campground) error(404, { message: 'Campground not found' });

	const form = await superValidate(zod(formCampgroundSchema));

	return {
		campground,
		form
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(formCampgroundSchema));

		if (!form.valid) return fail(400, { form });

		const { id, title, description, image, location, price } = form.data;

		const campground = await Campground.findByIdAndUpdate(id, {
			title,
			description,
			image,
			location,
			price
		});

		redirect(303, `/campgrounds/${campground?._id}`);
	}
} satisfies Actions;
