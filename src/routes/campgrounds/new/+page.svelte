<script lang="ts">
	import type { PageData } from './$types';

	import { CampgroundForm } from '$features/campgrounds/components';

	import { Metadata } from '$lib/components/metadata';

	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();
</script>

<Metadata title="Create new campground" />

<div class="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
	<Card>
		<CardHeader>
			<CardTitle class="text-center text-2xl">Add a campground</CardTitle>
		</CardHeader>

		<CardContent>
			<CampgroundForm form={data.form} />
		</CardContent>
	</Card>
</div>
