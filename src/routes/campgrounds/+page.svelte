<script lang="ts">
	import type { PageData } from './$types';

	import Plus from '@lucide/svelte/icons/plus';
	import House from '@lucide/svelte/icons/house';

	import truncate from 'lodash/truncate';

	import { toCurrency } from '$lib/currency';

	import { Metadata } from '$lib/components/metadata';

	import { Button } from '$lib/components/ui/button';
	import {
		Breadcrumb,
		BreadcrumbList,
		BreadcrumbItem,
		BreadcrumbLink,
		BreadcrumbPage,
		BreadcrumbSeparator
	} from '$lib/components/ui/breadcrumb';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();

	const { campgrounds } = data;
</script>

<Metadata title="Campgrounds" />

<div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
	<div class="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
		<div>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/" class="flex items-center"
							><House size={16} class="mr-2 size-4" /> Home</BreadcrumbLink
						>
					</BreadcrumbItem>

					<BreadcrumbSeparator />

					<BreadcrumbItem>
						<BreadcrumbPage>Campgrounds</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<h2 class="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
				Campgrounds
			</h2>
		</div>

		<div class="flex items-center space-x-4">
			<Button href="/campgrounds/new" variant="success"><Plus size={16} />New Campground</Button>
		</div>
	</div>

	<div class="mb-4 grid gap-7 sm:grid-cols-2 md:mb-8 lg:grid-cols-3">
		{#each campgrounds as campground}
			{@const campgroundUrl = `/campgrounds/${campground.id}`}

			<Card>
				<a href={campgroundUrl} class="contents">
					<CardHeader class="px-0 pt-0 h-72">
						<img class="w-full h-full rounded-t-lg" src={campground.image} alt={campground.title} />
					</CardHeader>
				</a>

				<CardContent>
					<a href={campgroundUrl} class="contents group">
						<CardTitle class="text-2xl text-center font-semibold group-hover:underline"
							>{campground.title}</CardTitle
						>
					</a>

					<CardDescription class="text-center">{campground.location}</CardDescription>

					<p
						class="my-4 text-2xl font-extrabold leading-tight text-gray-900 dark:text-white text-center"
					>
						{toCurrency(campground.price)}/night
					</p>

					<p class="mb-3 mt-1 break-words text-gray-500 dark:text-neutral-400">
						{truncate(campground.description, { length: 200 })}
					</p>
				</CardContent>

				<CardFooter>
					<Button href={campgroundUrl} class="w-full">Explore more</Button>
				</CardFooter>
			</Card>
		{/each}
	</div>
</div>
