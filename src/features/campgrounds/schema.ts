import { z } from 'zod';
import { Types } from 'mongoose';

export const campgroundFormSchema = z.object({
	title: z.string().min(1, 'Required'),
	price: z.number().min(1, 'Price cannot be 0'),
	description: z.string().min(1, 'Required'),
	location: z.string().min(1, 'Required'),
	image: z.string().min(1, 'Required')
});

export const campgroundIdSchema = z.object({
	id: z.string().refine((val) => {
		return Types.ObjectId.isValid(val);
	})
});
