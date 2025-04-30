<script lang="ts">
	import Star from '@lucide/svelte/icons/star';

	function randstr(prefix: string | undefined = undefined) {
		return Math.random()
			.toString(36)
			.replace('0.', prefix || '');
	}

	interface Props {
		value: number;
		max?: number;
		hover?: boolean;
		disabled?: boolean;
	}

	let { value = $bindable(0), max = 5, hover = false, disabled = false }: Props = $props();

	if (value > max)
		throw new Error(`Value cannot greater than max: (${value}) value > (${max}) max`);

	const percentages = $derived.by(() => {
		return Array.from({ length: max }, (_, i) => {
			const remaining = value - i;

			if (remaining >= 1) return 100;
			else if (remaining > 0) return Math.round(remaining * 100);

			return 0;
		});
	});

	if (hover) {
		value = 0;
	}

	const id = randstr();
	// TODO: add disabled
</script>

{#if !hover}
	{#each percentages as percentage, idx (idx)}
		<Star size={16} stroke="none" strokeWidth={0} fill={`url(#${id}-${idx})`}>
			<defs>
				<linearGradient id={`${id}-${idx}`}>
					<stop offset={`${percentage}%`} stop-color="#FFD700" />
					<stop offset={`${percentage}%`} stop-color="#bbb" />
				</linearGradient>
			</defs>
		</Star>
	{/each}
{:else}
	{#each percentages as percentage, idx (idx)}
		<Star
			size={16}
			stroke="none"
			onmouseover={() => (value = idx + 1)}
			strokeWidth={0}
			fill={`url(#${id}-${idx})`}
		>
			<defs>
				<linearGradient id={`${id}-${idx}`}>
					<stop offset={`${percentage}%`} stop-color="#FFD700" />
					<stop offset={`${percentage}%`} stop-color="#bbb" />
				</linearGradient>
			</defs>
		</Star>
	{/each}
{/if}
