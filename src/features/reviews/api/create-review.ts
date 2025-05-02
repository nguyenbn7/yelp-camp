import type { InferResponseType, InferRequestType } from 'hono';

import { createMutation } from '@tanstack/svelte-query';

import { client } from '$lib/rpc';
import { ClientError } from '$lib/error';

type ResponseError = Extract<
	InferResponseType<(typeof client.api.campgrounds)[':campgroundId']['reviews']['$post']>,
	{ status: number }
>;

type Response = InferResponseType<
	(typeof client.api.campgrounds)[':campgroundId']['reviews']['$post'],
	200
>;

type Request = InferRequestType<
	(typeof client.api.campgrounds)[':campgroundId']['reviews']['$post']
>;

export default function useCreateReview() {
	const mutation = createMutation<Response, ClientError, Request>({
		mutationFn: async ({ param, json }) => {
			const response = await client.api.campgrounds[':campgroundId']['reviews'].$post({
				param,
				json
			});

			if (!response.ok) {
				const { title, detail, status, requestId } = (await response.json()) as ResponseError;
				throw new ClientError({ requestId, message: title, detail, status });
			}

			return response.json();
		}
	});

	return mutation;
}
