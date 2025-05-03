<script>
	import { page } from '$app/state';
	import { Metadata } from '$lib/components/metadata';
	import { Button } from '$lib/components/ui/button';
	import { StatusCodes } from 'http-status-codes';
</script>

<Metadata title={page.status.toString()} />

<section class="flex min-h-screen items-center bg-white dark:bg-gray-900">
	<main class="mx-auto max-w-screen-xl pb-8 lg:pb-16">
		<div class="mx-auto max-w-screen-sm text-center">
			<h1 class="mb-4 text-7xl font-extrabold tracking-tight text-primary lg:text-9xl">
				{page.status}
			</h1>
			<p class="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
				{#if page.status === StatusCodes.NOT_FOUND}
					Something's missing.
				{:else}
					Internal Server Error.
				{/if}
			</p>
			<p class="mb-4 text-lg font-light text-gray-700 dark:text-gray-400">
				{#if page.status === StatusCodes.NOT_FOUND}
					Sorry, we can't find that page. You'll find lots to explore on the home page.
				{:else}
					We are already working to solve the problem.
				{/if}
			</p>
			<Button href="/">Back to Homepage</Button>
		</div>
	</main>
</section>
