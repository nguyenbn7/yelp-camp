import { Campground, type CampgroundSchema } from '$lib/server/mongo/document';

export async function findCampgrounds() {
	const campgrounds = await Campground.find()
		.select({
			title: 1,
			price: 1,
			description: 1,
			location: 1,
			image: 1
		})
		.transform((doc) => {
			return doc.map(
				(d) =>
					d.toObject({
						flattenObjectIds: true,
						transform(_doc, ret) {
							const { _id, ...data } = ret;
							return {
								id: _id,
								...data
							};
						}
					}) as unknown as Omit<CampgroundSchema & { id: string }, 'reviews'>
			);
		});

	return campgrounds;
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

	return campground.toObject();
}

export async function findCampgroundById(searchParams: { id: string }) {
	const { id } = searchParams;

	const campground = await Campground.findById(id).select({
		title: 1,
		price: 1,
		description: 1,
		image: 1,
		location: 1
	});

	return campground?.toObject({
		flattenObjectIds: true,
		transform(_doc, ret) {
			const { _id, ...data } = ret;
			return {
				id: _id,
				...data
			};
		}
	}) as Omit<CampgroundSchema & { id: string }, 'reviews'> | undefined;
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

	return campground;
}
