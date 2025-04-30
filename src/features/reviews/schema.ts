import { z } from 'zod';

export const reviewSchema = z.object({
	body: z.string().trim().min(1, 'Required'),
	rating: z.number() // TODO: add constraint
});
