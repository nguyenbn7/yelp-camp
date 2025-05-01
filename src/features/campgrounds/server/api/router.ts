import type { RequestIdVariables } from 'hono/request-id';

import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';

import { campgroundIdSchema } from '$features/campgrounds/schema';
import {
	deletesCampground,
	findCampgroundById,
	findCampgrounds
} from '$features/campgrounds/server/repository';

interface Env {
	Variables: RequestIdVariables;
}

const validateCampgroundId = () =>
	zValidator<typeof campgroundIdSchema, 'param', Env, string>(
		'param',
		campgroundIdSchema,
		(result, c) => {
			if (!result.success) {
				const { requestId } = c.var;

				return c.json(
					{
						requestId,
						status: StatusCodes.BAD_REQUEST,
						type: 'https://www.mongodb.com/docs/manual/reference/bson-types/#objectid',
						title: ReasonPhrases.BAD_REQUEST,
						detail: `Incorrect campground id format`
					},
					StatusCodes.BAD_REQUEST
				);
			}
		}
	);

const app = new Hono()
	.get('/', async (c) => {
		const campgrounds = await findCampgrounds();

		return c.json({
			campgrounds
		});
	})

	.get('/:id', validateCampgroundId(), async (c) => {
		const { id } = c.req.valid('param');

		const campground = await findCampgroundById({ id });

		if (!campground) {
			const { requestId } = c.var;

			return c.json(
				{
					requestId,
					status: StatusCodes.NOT_FOUND,
					title: ReasonPhrases.NOT_FOUND,
					detail: `Campground with id '${id}' not found`
				},
				StatusCodes.NOT_FOUND
			);
		}

		return c.json({
			campground
		});
	})

	.delete('/:id', validateCampgroundId(), async (c) => {
		const { id } = c.req.valid('param');

		const deletedCampground = await deletesCampground({ id });

		if (!deletedCampground) {
			const { requestId } = c.var;

			return c.json(
				{
					requestId,
					status: StatusCodes.NOT_FOUND,
					title: ReasonPhrases.NOT_FOUND,
					detail: `Campground with id '${id}' not found`
				},
				StatusCodes.NOT_FOUND
			);
		}

		return c.json({
			id: deletedCampground._id.toString()
		});
	});

export default app;
