import { StatusCodes } from 'http-status-codes';
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { reviewSchema } from '$features/reviews/schema';
import { createReview } from '$features/reviews/server/repository';
import { campgroundIdSchema } from '$features/reviews/internal/schema';
import { findCampgroundById } from '$features/reviews/server/internal/repository';

const app = new Hono().post(
	'/',
	zValidator('param', campgroundIdSchema, (result, c) => {
		if (!result.success)
			return c.json(
				{
					error: {
						code: StatusCodes.BAD_REQUEST,
						message: 'Invalid campground id type'
					}
				},
				StatusCodes.BAD_REQUEST
			);
	}),
	zValidator('json', reviewSchema),
	async (c) => {
		const { campgroundId } = c.req.valid('param');

		const campground = await findCampgroundById({ id: campgroundId });

		if (!campground)
			return c.json(
				{
					error: {
						code: StatusCodes.NOT_FOUND,
						message: 'Campground not found'
					}
				},
				StatusCodes.NOT_FOUND
			);

		const { body, rating } = c.req.valid('json');

		const review = await createReview(campground, { body, rating });

		return c.json({
			review
		});
	}
);

export default app;
