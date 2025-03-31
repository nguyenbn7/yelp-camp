<script lang="ts">
	import type { PageData } from './$types';
	import { Metadata } from '$lib/components/metadata';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Control, Field, FieldErrors, FormButton, Label } from '$lib/components/ui/form';
	import { formCampgroundSchema } from '$features/campgrounds/schemas';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();

	const form = superForm(data.form, {
		validators: zodClient(formCampgroundSchema.omit({ id: true }))
	});

	const { form: formData, enhance } = form;
</script>

<Metadata title="New Campground" />

<div class="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
	<Card>
		<CardHeader>
			<CardTitle class="text-center text-2xl">New Campground</CardTitle>
		</CardHeader>

		<CardContent>
			<form method="post" use:enhance class="space-y-5">
				<Field {form} name="title">
					<Control>
						{#snippet children({ props })}
							<Label>Title</Label>
							<Input {...props} bind:value={$formData.title} class="mt-3" />
						{/snippet}
					</Control>

					<FieldErrors />
				</Field>

				<Field {form} name="location">
					<Control>
						{#snippet children({ props })}
							<Label>Location</Label>
							<Input {...props} bind:value={$formData.location} class="mt-3" />
						{/snippet}
					</Control>

					<FieldErrors />
				</Field>

				<Field {form} name="image">
					<Control>
						{#snippet children({ props })}
							<Label>Image url</Label>
							<Input {...props} bind:value={$formData.image} class="mt-3" />
						{/snippet}
					</Control>

					<FieldErrors />
				</Field>

				<Field {form} name="price">
					<Control>
						{#snippet children({ props })}
							<Label>Price</Label>
							<Input {...props} bind:value={$formData.price} class="mt-3" />
						{/snippet}
					</Control>

					<FieldErrors />
				</Field>

				<Field {form} name="description">
					<Control>
						{#snippet children({ props })}
							<Label>Description</Label>
							<Textarea {...props} bind:value={$formData.description} class="mt-3" rows={10} />
						{/snippet}
					</Control>

					<FieldErrors />
				</Field>

				<div class="mt-10 flex justify-between gap-10">
					<Button href="/campgrounds" variant="outline" class="w-full">Back to Campgrounds</Button>
					<FormButton class="w-full hover:cursor-pointer">Create</FormButton>
				</div>
			</form>
		</CardContent>
	</Card>
</div>
