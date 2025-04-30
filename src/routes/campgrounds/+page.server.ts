import type { PageServerLoad } from './$types';
import { findCampgrounds } from '$features/campgrounds/server/repository';

export const load = (async () => {
	const campgrounds = await findCampgrounds();

	return {
		campgrounds
	};
}) satisfies PageServerLoad;
