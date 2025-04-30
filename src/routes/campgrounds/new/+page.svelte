<script lang="ts">
	import type { PageData } from './$types';
	import { Metadata } from '$lib/components/metadata';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { CampgroundForm } from '$features/campgrounds/components';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();
</script>

<Metadata title="New Campground" />

<div class="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
	<Card>
		<CardHeader>
			<CardTitle class="text-center text-2xl">New Campground</CardTitle>
		</CardHeader>

		<CardContent>
			<CampgroundForm form={data.form} />
		</CardContent>
	</Card>
</div>
