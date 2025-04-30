<script lang="ts">
	import type { PageData } from './$types';

	import Star from '@lucide/svelte/icons/star';
	import Trash2 from '@lucide/svelte/icons/trash-2';
	import SquarePen from '@lucide/svelte/icons/square-pen';

	import { Button } from '$lib/components/ui/button';

	import { toCurrency } from '$lib/currency';
	import { Metadata } from '$lib/components/metadata';
	import { RatingStars } from '$lib/components/rating-stars';

	import { ReviewForm } from '$features/reviews/components';

	let { data }: { data: PageData } = $props();
	const { campground } = data;

	let rating: number = $state(4.3);
	let reviews: { _id: string; body: string; rating: number; createdDate: Date }[] = $state(
		campground.reviews
	);
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

				<!-- TODO: prompt confirm dialog then call api -->
				<Button variant="outline-destructive" class="hover:cursor-pointer">
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
					<form action="?/deleteComment" method="post">
						<input type="hidden" name="campgroundId" value={campground._id} />
						<input type="hidden" name="reviewId" value={review._id} />
						<button
							class="rounded-lg bg-red-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
							type="submit"
							title="Delete"
						>
							<svg
								aria-hidden="true"
								class="h-5 w-5"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
								><path
									fill-rule="evenodd"
									d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
									clip-rule="evenodd"
								></path></svg
							>
							<span class="sr-only">Delete</span>
						</button>
					</form>
				</footer>
				<p class="text-gray-500 dark:text-gray-400 whitespace-pre-wrap">
					{review.body}
				</p>
			</article>
		{/each}
	</div>
</div>
