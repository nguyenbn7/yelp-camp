import { StatusCodes } from 'http-status-codes';
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { campgroundIdSchema } from '$features/campgrounds/schema';
import { findCampgroundById, findCampgrounds } from '$features/campgrounds/server/repository';

const app = new Hono()
	.get('/', async (c) => {
		const campgrounds = await findCampgrounds();

		return c.json({
			campgrounds
		});
	})
	.get(
		'/:id',
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
		async (c) => {
			const { id } = c.req.valid('param');

			const campground = await findCampgroundById({ id });

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

			return c.json({
				campground
			});
		}
	);

export default app;
