<script lang="ts">
	import Logo from '$assets/logo.png';
	import { PUBLIC_APP_NAME } from '$env/static/public';

	import { cn } from '$lib/utils';

	import { ToggleDarkModeButton } from '$lib/components/button/index';

	import { Button } from '$lib/components/ui/button';
	import { page } from '$app/state';

	interface Props {
		fixedTop?: boolean;
		visibleAtPx?: number;
	}

	const { fixedTop = false, visibleAtPx = undefined }: Props = $props();

	const routes = [
		{ href: '/', label: 'Home' },
		{
			href: '/campgrounds',
			label: 'Campgrounds'
		}
	];

	let y: number = $state(0);
</script>

<svelte:window bind:scrollY={y} />

<nav
	class={cn(
		'bg-white antialiased dark:bg-gray-800',
		fixedTop && 'fixed left-0 top-0 w-full',
		visibleAtPx && y < visibleAtPx && 'bg-transparent dark:bg-transparent'
	)}
>
	<div class="mx-auto max-w-screen-xl px-4 py-4 2xl:px-0">
		<div class="flex items-center justify-between">
			<div class="flex items-center space-x-8">
				<div class="shrink-0">
					<a href="/" title={PUBLIC_APP_NAME}>
						<img class="block h-8 w-auto" src={Logo} alt="Logo" />
					</a>
				</div>

				<ul
					class={cn(
						'hidden items-center justify-start gap-6 py-3 sm:justify-center md:gap-8 lg:flex',
						visibleAtPx && y < visibleAtPx && 'text-white'
					)}
				>
					{#each routes as route}
						<li>
							<a
								href={route.href}
								title={route.label}
								class={cn(
									'flex text-sm font-medium hover:text-primary',
									page.url.pathname === route.href && 'text-primary'
								)}
							>
								{route.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div class="flex items-center space-x-2 mb-2">
				<Button
					class="rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-lg shadow-blue-500/50 hover:bg-gradient-to-br focus:ring-blue-300 dark:shadow-lg dark:shadow-blue-800/80 dark:focus:ring-blue-800"
					href="/sign-in"
				>
					Sign In
				</Button>

				<ToggleDarkModeButton class="rounded-lg" />
			</div>
		</div>
	</div>
</nav>
