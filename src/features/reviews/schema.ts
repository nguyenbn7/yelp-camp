import { Types } from 'mongoose';
import { z } from 'zod';

export const reviewSchema = z.object({
	body: z.string().trim().min(1, 'Required'),
	rating: z.number().min(1, 'Required').max(5)
});

export const reviewIdSchema = z.object({
	id: z.string().refine((val) => {
		return Types.ObjectId.isValid(val);
	})
});
