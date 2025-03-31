<script lang="ts">
	import { PUBLIC_APP_NAME } from '$env/static/public';

	interface Props {
		title?: string;
	}
	let { title }: Props = $props();
</script>

<svelte:head>
	{#if title}
		<title>{title} - {PUBLIC_APP_NAME ?? 'APP_NAME'}</title>
	{:else}
		<title>{PUBLIC_APP_NAME ?? 'APP_NAME'}</title>
	{/if}
</svelte:head>
