import type { InferResponseType, InferRequestType } from 'hono';

import { client } from '$lib/rpc';
import { createMutation } from '@tanstack/svelte-query';

type ResponseError = Extract<
	InferResponseType<(typeof client.api.campgrounds)[':campgroundId']['reviews']['$post']>,
	{ error: {} }
>;
type Response = InferResponseType<
	(typeof client.api.campgrounds)[':campgroundId']['reviews']['$post'],
	200
>;
type Request = InferRequestType<
	(typeof client.api.campgrounds)[':campgroundId']['reviews']['$post']
>;

export default function useCreateReview() {
	const mutation = createMutation<Response, Error, Request>({
		mutationFn: async ({ param, json }) => {
			const response = await client.api.campgrounds[':campgroundId']['reviews'].$post({
				param,
				json
			});

			if (!response.ok) {
				const { error: err } = (await response.json()) as unknown as ResponseError;
				const error = new Error(err.message) as Error & { status: number; code: number };
				error.status = response.status;
				error.code = err.code;
				throw error;
			}

			return response.json();
		}
	});

	return mutation;
}
