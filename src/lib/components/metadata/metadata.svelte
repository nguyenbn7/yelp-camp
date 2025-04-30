<script lang="ts">
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import { DEFAULT_APP_NAME } from '$lib/constant';

	interface Props {
		title?: string;
	}

	let { title }: Props = $props();

	const APP_NAME = $derived(PUBLIC_APP_NAME || DEFAULT_APP_NAME);
	const TITLE = $derived(title ? `${title} - ${APP_NAME}` : APP_NAME);
</script>

<svelte:head>
	<title>{TITLE}</title>
	<!-- TODO: add metdata for SEO later -->
</svelte:head>
