<script lang="ts">
	import Logo from '$assets/logo.png';

	import { PUBLIC_APP_NAME } from '$env/static/public';

	const routes = [
		{ href: '/', label: 'Home' },
		{
			href: '/campgrounds',
			label: 'Campgrounds'
		}
	];
</script>

<footer class="bg-white p-4 dark:bg-gray-800 md:p-8 lg:p-10">
	<div class="mx-auto max-w-screen-xl text-center">
		<a
			href="/"
			class="flex items-center justify-center text-2xl font-semibold text-gray-900 dark:text-white"
		>
			<img class="mr-2 max-w-10" src={Logo} alt="Logo" />
			{PUBLIC_APP_NAME}
		</a>

		<p class="my-6 text-gray-500 dark:text-gray-400">
			A campground is where we gather to weave memories beneath constellations, forging bonds as
			strong as the roots of ancient trees.
		</p>

		<ul class="mb-6 flex flex-wrap items-center justify-center text-gray-900 dark:text-white">
			{#each routes as route}
				<li>
					<a href={route.href} class="mr-4 hover:underline md:mr-6">{route.label}</a>
				</li>
			{/each}
		</ul>

		<span class="text-sm text-gray-500 dark:text-gray-400 sm:text-center"
			>© {new Date().getFullYear()} <a href="/" class="hover:underline">{PUBLIC_APP_NAME}</a>. All
			Rights Reserved.</span
		>
	</div>
</footer>
