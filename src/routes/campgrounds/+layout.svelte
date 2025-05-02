<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	import { Footer, Header } from '$lib/components';
	import { BackToTopButton } from '$lib/components/button';

	interface LayoutProps {
		data: LayoutData;
		children: Snippet;
	}

	const { data, children }: LayoutProps = $props();
</script>

<Header />

<main class="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
	{@render children()}
</main>

<Footer />

<BackToTopButton />
