import type { RequestIdVariables } from 'hono/request-id';
import type { CampgroundDocument } from '$lib/server/mongo/document';

import { reviewIdSchema, reviewSchema } from '$features/reviews/schema';
import { createReview, deleteReview, findReviews } from '$features/reviews/server/repository';

import { campgroundIdSchema } from '$features/reviews/internal/schema';
import { findCampgroundById } from '$features/reviews/server/internal/repository';

import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';

interface Env {
	Variables: RequestIdVariables & { campground: CampgroundDocument };
}

const paramSchema = campgroundIdSchema.extend(reviewIdSchema.shape);

const validateCampground = () =>
	zValidator<typeof campgroundIdSchema, 'param', Env, string>(
		'param',
		campgroundIdSchema,
		async (result, c) => {
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

			const { campgroundId } = result.data;

			const campground = await findCampgroundById({ id: campgroundId });

			if (!campground) {
				const { requestId } = c.var;

				return c.json(
					{
						requestId,
						status: StatusCodes.NOT_FOUND,
						title: ReasonPhrases.NOT_FOUND,
						detail: `Campground with id '${campgroundId}' not found`
					},
					StatusCodes.NOT_FOUND
				);
			}

			c.set('campground', campground);
		}
	);

const validateParamIds = () =>
	zValidator<typeof paramSchema, 'param', Env, string>('param', paramSchema, async (result, c) => {
		if (!result.success) {
			const { requestId } = c.var;

			return c.json(
				{
					requestId,
					status: StatusCodes.BAD_REQUEST,
					type: 'https://www.mongodb.com/docs/manual/reference/bson-types/#objectid',
					title: ReasonPhrases.BAD_REQUEST,
					detail: `Incorrect review or campground id format`
				},
				StatusCodes.BAD_REQUEST
			);
		}

		const { campgroundId } = result.data;

		const campground = await findCampgroundById({ id: campgroundId });

		if (!campground) {
			const { requestId } = c.var;

			return c.json(
				{
					requestId,
					status: StatusCodes.NOT_FOUND,
					title: ReasonPhrases.NOT_FOUND,
					detail: `Campground with id '${campgroundId}' not found`
				},
				StatusCodes.NOT_FOUND
			);
		}

		c.set('campground', campground);
	});

const app = new Hono<Env>()
	.get('/', validateCampground(), async (c) => {
		const { campground } = c.var;

		const reviews = await findReviews(campground);

		return c.json({
			reviews
		});
	})
	.post('/', validateCampground(), zValidator('json', reviewSchema), async (c) => {
		const { campground } = c.var;

		const { body, rating } = c.req.valid('json');

		const review = await createReview(campground, { body, rating });

		return c.json({
			review
		});
	})
	.delete('/:id', validateParamIds(), async (c) => {
		const { campgroundId, id } = c.req.valid('param');

		const deletedReview = await deleteReview({ campgroundId, reviewId: id });

		if (!deletedReview) {
			const { requestId } = c.var;

			return c.json(
				{
					requestId,
					status: StatusCodes.NOT_FOUND,
					title: ReasonPhrases.NOT_FOUND,
					detail: `Review with id '${id}' not found`
				},
				StatusCodes.NOT_FOUND
			);
		}

		return c.json({
			id
		});
	});

export default app;
