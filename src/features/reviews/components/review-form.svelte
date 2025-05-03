<script lang="ts">
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod, zodClient } from 'sveltekit-superforms/adapters';

	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { Textarea } from '$lib/components/ui/textarea';
	import { FormControl, FormField, FormFieldErrors } from '$lib/components/ui/form';

	import { RatingStars } from '$lib/components/rating-stars';

	import { reviewSchema } from '$features/reviews/schema';
	import { useCreateReview } from '$features/reviews/api';

	interface Props {
		campgroundId: string;
	}

	let { campgroundId }: Props = $props();

	const createReview = useCreateReview();

	const form = superForm(defaults(zod(reviewSchema)), {
		id: 'create-review',
		SPA: true,
		validators: zodClient(reviewSchema),
		onUpdate({ form }) {
			if (form.valid) {
				$createReview.mutate({ param: { campgroundId }, json: form.data });
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<div class="mb-4 grid grid-cols-2 gap-4">
		<div class="col-span-2">
			<FormField {form} name="rating" class="mb-3">
				<FormControl>
					{#snippet children({ props })}
						<div class="flex items-center gap-x-2">
							<Label onmouseover={() => ($formData.rating = 0)}>Rating:</Label>

							<input {...props} value={$formData.rating} hidden />

							<div class="flex items-center gap-1">
								<RatingStars
									bind:value={$formData.rating}
									hover
									disabled={$createReview.isPending}
								/> ({$formData.rating})
							</div>
						</div>
					{/snippet}
				</FormControl>

				<FormFieldErrors />
			</FormField>

			<FormField {form} name="body" class="col-span-2">
				<FormControl>
					{#snippet children({ props })}
						<Label>Your Comment</Label>
						<Textarea
							{...props}
							bind:value={$formData.body}
							rows={7}
							disabled={$createReview.isPending}
						/>
					{/snippet}
				</FormControl>

				<FormFieldErrors />
			</FormField>
		</div>

		<div class="border-t border-gray-200 pt-4 dark:border-gray-700 md:pt-5">
			<Button type="submit" class="hover:cursor-pointer">Submit</Button>
		</div>
	</div>
</form>
