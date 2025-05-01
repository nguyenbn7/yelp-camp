<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { campgroundFormSchema } from '$features/campgrounds/schema';

	import { z } from 'zod';

	import { cn } from '$lib/utils';

	import { superForm, type SuperValidated } from 'sveltekit-superforms/client';
	import { zodClient } from 'sveltekit-superforms/adapters';

	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { Textarea } from '$lib/components/ui/textarea';
	import { FormButton, FormControl, FormField, FormFieldErrors } from '$lib/components/ui/form';

	interface Props {
		form: SuperValidated<z.infer<typeof campgroundFormSchema>, any>;
		class?: string;
		campgroundId?: string;
	}

	let {
		campgroundId,
		form: _form,
		class: className,
		...restProps
	}: Props & HTMLAttributes<HTMLFormElement> = $props();

	const form = superForm(_form, {
		validators: zodClient(campgroundFormSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form {...restProps} method="post" use:enhance class={cn('space-y-5', className)}>
	{#if campgroundId}
		<input name="id" value={campgroundId} hidden />
	{/if}

	<FormField {form} name="title">
		<FormControl>
			{#snippet children({ props })}
				<Label>Title</Label>
				<Input {...props} bind:value={$formData.title} class="mt-3" />
			{/snippet}
		</FormControl>

		<FormFieldErrors />
	</FormField>

	<FormField {form} name="location">
		<FormControl>
			{#snippet children({ props })}
				<Label>Location</Label>
				<Input {...props} bind:value={$formData.location} class="mt-3" />
			{/snippet}
		</FormControl>

		<FormFieldErrors />
	</FormField>

	<FormField {form} name="image">
		<FormControl>
			{#snippet children({ props })}
				<Label>Image url</Label>
				<Input {...props} bind:value={$formData.image} class="mt-3" />
			{/snippet}
		</FormControl>

		<FormFieldErrors />
	</FormField>

	<FormField {form} name="price">
		<FormControl>
			{#snippet children({ props })}
				<Label>Price</Label>
				<Input {...props} bind:value={$formData.price} class="mt-3" />
			{/snippet}
		</FormControl>

		<FormFieldErrors />
	</FormField>

	<FormField {form} name="description">
		<FormControl>
			{#snippet children({ props })}
				<Label>Description</Label>
				<Textarea {...props} bind:value={$formData.description} class="mt-3" rows={10} />
			{/snippet}
		</FormControl>

		<FormFieldErrors />
	</FormField>

	<div class="mt-10 flex justify-between gap-10">
		{#if campgroundId}
			<Button href="/campgrounds/{campgroundId}" variant="outline-danger" class="w-full"
				>Back</Button
			>
		{:else}
			<Button href="/campgrounds" variant="outline-danger" class="w-full"
				>Back to Campgrounds</Button
			>
		{/if}

		<FormButton class="w-full hover:cursor-pointer">{campgroundId ? 'Update' : 'Create'}</FormButton
		>
	</div>
</form>
