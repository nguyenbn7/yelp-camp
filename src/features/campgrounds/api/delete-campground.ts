import type { InferResponseType, InferRequestType } from 'hono';

import { createMutation, useQueryClient } from '@tanstack/svelte-query';

import { client } from '$lib/rpc';
import { ClientError } from '$lib/error';

import { goto } from '$app/navigation';

import { toast } from 'svelte-sonner';

type ResponseError = Extract<
	InferResponseType<(typeof client.api.campgrounds)[':id']['$delete']>,
	{ status: number }
>;

type Response = InferResponseType<(typeof client.api.campgrounds)[':id']['$delete'], 200>;

type Request = InferRequestType<(typeof client.api.campgrounds)[':id']['$delete']>;

interface Options {
	onSuccess?: (data: Response, variables: Request, context: unknown) => Promise<unknown> | unknown;
	onError?: (
		error: ClientError,
		variables: Request,
		context: unknown
	) => Promise<unknown> | unknown;
}

export default function useDeleteCampground(options: Options = {}) {
	const { onSuccess, onError } = options;

	const queryClient = useQueryClient();

	const mutation = createMutation<Response, ClientError, Request>({
		mutationFn: async ({ param }) => {
			const response = await client.api.campgrounds[':id'].$delete({
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
			toast.success('Campground is deleted');

			await onSuccess?.(data, variables, context);

			return goto('/campgrounds', { replaceState: true, invalidateAll: true });
		}
	});

	return mutation;
}
