<script lang="ts">
	import type { PageData } from './$types';

	import Star from '@lucide/svelte/icons/star';
	import Trash2 from '@lucide/svelte/icons/trash-2';
	import SquarePen from '@lucide/svelte/icons/square-pen';

	import { useDeleteCampground } from '$features/campgrounds/api';

	import { ReviewForm } from '$features/reviews/components';
	import { useDeleteReview } from '$features/reviews/api';

	import { Metadata } from '$lib/components/metadata';
	import { RatingStars } from '$lib/components/rating-stars';

	import { toCurrency } from '$lib/currency';

	import { Button } from '$lib/components/ui/button';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();

	const { campground } = data;

	// TODO: get rating and reviews from campground rather than hardcode
	let rating: number = $state(4.3);

	// TODO: remove this after done with ssr campground
	let reviews: { _id: string; body: string; rating: number; createdDate: Date }[] = $state(
		campground.reviews
	);

	const deleteCampground = useDeleteCampground();
	const deleteReview = useDeleteReview();
</script>

<Metadata title={`Campground: ${campground.title}`} />

<div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
	<div class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
		<div class="mx-auto max-w-md shrink-0 lg:max-w-lg">
			<img class="w-full" src={campground.image} alt="Preview" />
		</div>

		<!-- TODO: refactor this -->
		<div class="mt-6 sm:mt-8 lg:mt-0">
			<h1 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
				{campground.title}
			</h1>
			<div class="mt-4 sm:flex sm:items-center sm:gap-4">
				<p class="text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">
					{toCurrency(campground.price)}/night
				</p>
				<div class="mt-2 flex items-center gap-2 sm:mt-0">
					<div class="flex items-center gap-1">
						<RatingStars value={rating} />
					</div>

					<p class="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
						({rating})
					</p>
					<a
						href="#reviews"
						class="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
					>
						345 Reviews
					</a>
				</div>
			</div>

			<div class="mt-6 sm:mt-8 sm:flex sm:items-center sm:gap-4">
				<Button href="/campgrounds/{campground._id}/edit"
					><SquarePen size={16} class="mr-2" /> Edit</Button
				>

				<Button
					variant="outline-danger"
					class="hover:cursor-pointer"
					onclick={() => {
						// TODO: prompt confirm dialog

						$deleteCampground.mutate({
							param: {
								id: campground._id as string
							}
						});
					}}
				>
					<Trash2 size={16} class="mr-2" /> Delete
				</Button>
			</div>

			<hr class="my-6 border-gray-200 dark:border-gray-800 md:my-8" />

			<p class="mb-6 text-gray-500 dark:text-gray-400">
				{campground.description}
			</p>
		</div>
	</div>

	<div class="mx-auto mt-10 max-w-screen-md px-4 2xl:px-0">
		<div class="gap-3 pb-6 sm:flex sm:items-start">
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Leaving a review</h2>
		</div>

		<ReviewForm campgroundId={campground._id} />
	</div>

	<!-- TODO: extract as component -->
	<div
		class="mx-auto mt-10 max-w-screen-md divide-y divide-gray-200 px-4 dark:divide-gray-700"
		id="reviews"
	>
		{#each reviews as review}
			{@const createdDate = new Date(review.createdDate)}
			<article class="rounded-lg bg-white p-6 text-base dark:bg-gray-900">
				<footer class="mb-2 flex items-center justify-between">
					<div class="flex items-center">
						<div class="mr-2 flex items-center gap-1">
							{review.rating}
							<Star size={16} class="size-4" stroke="none" strokeWidth={0} fill="#FFD700" />
						</div>
						<p
							class="mr-3 inline-flex items-center text-sm font-semibold text-gray-900 dark:text-white"
						>
							Michael Gough
						</p>
						<p class="text-sm text-gray-600 dark:text-gray-400">
							<time
								datetime={createdDate.toLocaleDateString('en-US', {
									month: 'long',
									year: 'numeric',
									day: 'numeric',
									hour: 'numeric',
									minute: 'numeric'
								})}
								title={createdDate.toLocaleDateString('en-US', {
									month: 'long',
									year: 'numeric',
									day: 'numeric'
								})}
								>{createdDate.toLocaleDateString('en-US', {
									month: 'short',
									year: 'numeric',
									day: 'numeric'
								})}</time
							>
						</p>
					</div>

					<Button
						size="icon"
						variant="danger"
						class="hover:cursor-pointer"
						title="Delete"
						onclick={() => {
							// TODO: prompt confirm dialog
							$deleteReview.mutate({
								param: {
									campgroundId: campground._id as string,
									reviewId: review._id
								}
							});
						}}
					>
						<Trash2 size={16} />
					</Button>
				</footer>

				<p class="text-gray-500 dark:text-gray-400 whitespace-pre-wrap">
					{review.body}
				</p>
			</article>
		{/each}
	</div>
</div>
