<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';

	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';

	import { Toaster } from '$lib/components/ui/sonner';

	interface LayoutProps {
		data: LayoutData;
		children: Snippet;
	}

	let { data, children }: LayoutProps = $props();

	const queryClient = new QueryClient();
</script>

<ModeWatcher />

<Toaster richColors closeButton />

<QueryClientProvider client={queryClient}>
	{@render children()}
</QueryClientProvider>
