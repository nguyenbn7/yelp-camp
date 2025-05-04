import type { InferResponseType } from 'hono';

import { createQuery, useQueryClient } from '@tanstack/svelte-query';

import { client } from '$lib/rpc';

type Response = InferResponseType<
	(typeof client.api.campgrounds)[':campgroundId']['reviews']['$get']
>;

interface Param {
	campgroundId: string;
}

interface SSR {
	reviews?: Response['reviews'];
}

export default function useGetReviews(param: Param, ssr: SSR = { reviews: undefined }) {
	const { campgroundId } = param;

	const { reviews } = ssr;

	const queryClient = useQueryClient();

	if (reviews) {
		queryClient.setQueryData(['get', 'campgrounds', campgroundId, 'reviews'], () => ({
			reviews: [...reviews]
		}));
	}

	const query = createQuery<Response, Error>({
		queryKey: ['get', 'campgrounds', campgroundId, 'reviews'],
		queryFn: async () => {
			const response = await client.api.campgrounds[':campgroundId']['reviews']['$get']({
				param: { campgroundId }
			});

			return response.json();
		},
		initialData: {
			reviews: []
		},
		staleTime: reviews ? 1000 : 0
	});

	return query;
}
