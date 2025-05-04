import type { InferResponseType, InferRequestType } from 'hono';

import { createMutation, useQueryClient } from '@tanstack/svelte-query';

import { client } from '$lib/rpc';
import { ClientError } from '$lib/error';

import { toast } from 'svelte-sonner';

type ResponseError = Extract<
	InferResponseType<(typeof client.api.campgrounds)[':campgroundId']['reviews'][':id']['$delete']>,
	{ status: number }
>;

type Response = InferResponseType<
	(typeof client.api.campgrounds)[':campgroundId']['reviews'][':id']['$delete'],
	200
>;

type Request = InferRequestType<
	(typeof client.api.campgrounds)[':campgroundId']['reviews'][':id']['$delete']
>;

interface Options {
	onSuccess?: (data: Response, variables: Request, context: unknown) => Promise<unknown> | unknown;
	onError?: (
		error: ClientError,
		variables: Request,
		context: unknown
	) => Promise<unknown> | unknown;
}

export default function useDeleteReview(options: Options = {}) {
	const { onSuccess, onError } = options;

	const queryClient = useQueryClient();

	const mutation = createMutation<Response, ClientError, Request>({
		mutationFn: async ({ param }) => {
			const response = await client.api.campgrounds[':campgroundId']['reviews'][':id'].$delete({
				param
			});

			if (!response.ok) {
				const { title, detail, status, requestId } = (await response.json()) as ResponseError;
				throw new ClientError({ requestId, message: title, detail, status });
			}

			return response.json();
		},
		async onError(error, variables, context) {
			const { message, status } = error;

			await onError?.(error, variables, context);

			toast.error(message);
		},
		async onSuccess(data, variables, context) {
			toast.success('Review is deleted');

			const { campgroundId } = variables.param;

			await queryClient.invalidateQueries({
				queryKey: ['get', 'campgrounds', campgroundId, 'reviews']
			});

			return onSuccess?.(data, variables, context);
		}
	});

	return mutation;
}
