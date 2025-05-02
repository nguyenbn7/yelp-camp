<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	import { Footer, Header } from '$lib/components';

	interface PageProps {
		data: LayoutData;
		children: Snippet;
	}

	const { data, children }: PageProps = $props();
</script>

<Header fixedTop={true} visibleAtPx={30} />

{@render children()}

<Footer />
