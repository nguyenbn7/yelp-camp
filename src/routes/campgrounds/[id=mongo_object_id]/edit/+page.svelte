<script lang="ts">
	import type { PageData } from './$types';
	import { Metadata } from '$lib/components/metadata';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { formCampgroundSchema } from '$features/campgrounds/schemas';
	import { Control, Field, FieldErrors, FormButton } from '$lib/components/ui/form';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';

	interface PageProps {
		data: PageData;
	}

	let { data }: PageProps = $props();

	const { campground } = data;

	const form = superForm(data.form, {
		validators: zodClient(formCampgroundSchema)
	});

	const { form: formData, enhance } = form;

	formData.set({
		id: campground._id.toString(),
		title: campground.title,
		description: campground.description,
		image: campground.image,
		location: campground.location,
		price: campground.price
	});
</script>

<Metadata title="Edit Campground" />

<div class="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
	<Card>
		<CardHeader>
			<CardTitle class="text-center text-2xl">Edit Campground</CardTitle>
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
					<Button href="/campgrounds/{campground._id}" variant="destructive" class="w-full"
						>Back to Campgrounds</Button
					>
					<FormButton class="w-full hover:cursor-pointer">Update</FormButton>
				</div>
			</form>
		</CardContent>
	</Card>
</div>
