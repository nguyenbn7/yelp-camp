<script lang="ts">
	import type { PageData } from './$types';
	import { Metadata } from '$lib/components/metadata';
	import { toCurrency } from '$lib';
	// import { submitReview } from '$lib/review';

	let { data }: { data: PageData } = $props();
	const { campground } = data;

	let showDialog = $state(false);
	let body: string = $state('');
	let rating: number = $state(1);
	let reviews: { _id: string; body: string; rating: number; createdDate: Date }[] = $state(
		campground.reviews
	);

	// async function onsubmit($event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
	// 	$event.stopPropagation();
	// 	$event.preventDefault();
	// 	reviews = await submitReview(campground._id, {
	// 		body,
	// 		rating
	// 	});

	// 	body = '';
	// 	rating = 1;
	// }
</script>

<Metadata title={`Campground: ${campground.title}`} />

<div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
	<div class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
		<div class="mx-auto max-w-md shrink-0 lg:max-w-lg">
			<img class="w-full" src={campground.image} alt="Preview" />
		</div>

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
						<!-- TODO: -->
						<svg
							class="h-4 w-4 text-yellow-300"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
							/>
						</svg>
						<svg
							class="h-4 w-4 text-yellow-300"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
							/>
						</svg>
						<svg
							class="h-4 w-4 text-yellow-300"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
							/>
						</svg>
						<svg
							class="h-4 w-4 text-yellow-300"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
							/>
						</svg>
						<svg
							class="h-4 w-4 text-yellow-300"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
							/>
						</svg>
					</div>
					<p class="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">(5.0)</p>
					<a
						href="#reviews"
						class="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
					>
						345 Reviews
					</a>
				</div>
			</div>

			<div class="mt-6 sm:mt-8 sm:flex sm:items-center sm:gap-4">
				<a
					type="button"
					href="/campgrounds/{campground._id}/edit"
					class="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
				>
					<svg
						aria-hidden="true"
						class="-ml-1 mr-1 h-5 w-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
						></path><path
							fill-rule="evenodd"
							d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
							clip-rule="evenodd"
						></path></svg
					>
					Edit
				</a>
				<button
					type="button"
					class="inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
					onclick={() => (showDialog = true)}
				>
					<svg
						aria-hidden="true"
						class="-ml-1 mr-1.5 h-5 w-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
							clip-rule="evenodd"
						></path></svg
					>
					Delete
				</button>
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
		<form method="post">
			<div class="mb-4 grid grid-cols-2 gap-4">
				<div class="col-span-2">
					<div class="relative mb-6">
						<label
							for="review-rating"
							class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Rating</label
						>
						<input
							id="review-rating"
							type="range"
							min="1"
							max="5"
							bind:value={rating}
							class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
						/>
						<span class="absolute -bottom-6 start-0 text-sm text-gray-500 dark:text-gray-400"
							>1</span
						>
						<span
							class="absolute -bottom-6 start-1/4 -translate-x-1/2 text-sm text-gray-500 dark:text-gray-400 rtl:translate-x-1/2"
							>2</span
						>
						<span
							class="absolute -bottom-6 start-2/4 -translate-x-1/2 text-sm text-gray-500 dark:text-gray-400 rtl:translate-x-1/2"
							>3</span
						>
						<span
							class="absolute -bottom-6 start-3/4 -translate-x-1/2 text-sm text-gray-500 dark:text-gray-400 rtl:translate-x-1/2"
							>4</span
						>
						<span class="absolute -bottom-6 end-0 text-sm text-gray-500 dark:text-gray-400">5</span>
					</div>

					<!-- TODO: implement hover review star -->
					<!-- <div class="flex items-center">
						<svg
							class="h-6 w-6 text-yellow-300"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 22 20"
						>
							<path
								d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
							/>
						</svg>
						<svg
							class="ms-2 h-6 w-6 text-yellow-300"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 22 20"
						>
							<path
								d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
							/>
						</svg>
						<svg
							class="ms-2 h-6 w-6 text-yellow-300"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 22 20"
						>
							<path
								d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
							/>
						</svg>
						<svg
							class="ms-2 h-6 w-6 text-gray-300 dark:text-gray-500"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 22 20"
						>
							<path
								d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
							/>
						</svg>
						<svg
							class="ms-2 h-6 w-6 text-gray-300 hover:text-yellow-300 dark:text-gray-500 dark:hover:text-yellow-300"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 22 20"
						>
							<path
								d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
							/>
						</svg>
						<span class="ms-2 text-lg font-bold text-gray-900 dark:text-white">3.0 out of 5</span>
					</div> -->
				</div>
				<div class="col-span-2">
					<label
						for="review-body"
						class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Review</label
					>
					<textarea
						id="review-body"
						rows="6"
						class="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
						bind:value={body}
						required
					></textarea>
				</div>
			</div>
			<div class="border-t border-gray-200 pt-4 dark:border-gray-700 md:pt-5">
				<button
					type="submit"
					class="me-2 inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
					>Post review</button
				>
			</div>
		</form>
	</div>

	<div
		class="mx-auto mt-10 max-w-screen-md divide-y divide-gray-200 px-4 dark:divide-gray-700"
		id="reviews"
	>
		{#each reviews as review}
			{@const createdDate = new Date(review.createdDate)}
			<article class="rounded-lg bg-white p-6 text-base dark:bg-gray-900">
				<footer class="mb-2 flex items-center justify-between">
					<div class="flex items-center">
						<!-- <div class="flex items-center gap-0.5 mr-3">
							 <svg
								 class="h-4 w-4 text-yellow-300"
								 aria-hidden="true"
								 xmlns="http://www.w3.org/2000/svg"
								 width="24"
								 height="24"
								 fill="currentColor"
								 viewBox="0 0 24 24"
							 >
								 <path
									 d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
								 />
							 </svg>
		 
							 <svg
								 class="h-4 w-4 text-yellow-300"
								 aria-hidden="true"
								 xmlns="http://www.w3.org/2000/svg"
								 width="24"
								 height="24"
								 fill="currentColor"
								 viewBox="0 0 24 24"
							 >
								 <path
									 d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
								 />
							 </svg>
		 
							 <svg
								 class="h-4 w-4 text-yellow-300"
								 aria-hidden="true"
								 xmlns="http://www.w3.org/2000/svg"
								 width="24"
								 height="24"
								 fill="currentColor"
								 viewBox="0 0 24 24"
							 >
								 <path
									 d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
								 />
							 </svg>
		 
							 <svg
								 class="h-4 w-4 text-yellow-300"
								 aria-hidden="true"
								 xmlns="http://www.w3.org/2000/svg"
								 width="24"
								 height="24"
								 fill="currentColor"
								 viewBox="0 0 24 24"
							 >
								 <path
									 d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
								 />
							 </svg>
		 
							 <svg
								 class="h-4 w-4 text-yellow-300"
								 aria-hidden="true"
								 xmlns="http://www.w3.org/2000/svg"
								 width="24"
								 height="24"
								 fill="currentColor"
								 viewBox="0 0 24 24"
							 >
								 <path
									 d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
								 />
							 </svg>
						 </div> -->
						<div class="mr-3 flex items-center gap-0.5">
							{review.rating}
							<svg
								class="h-4 w-4 text-yellow-300"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
								/>
							</svg>
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
