<script lang="ts">
	interface Props {
		value: number;
		max?: number;
	}

	let { value, max = 5 }: Props = $props();

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

	$inspect(percentages);
</script>

{#each percentages as percentage, idx (idx)}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<defs>
			<linearGradient id={`star-grad-${idx}`}>
				<stop offset={`${percentage}%`} stop-color="yellow" />
				<stop offset={`${percentage}%`} stop-color="transparent" />
			</linearGradient>
		</defs>

		<path
			d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
			fill={`url(#star-grad-${idx})`}
		/>
	</svg>
{/each}
