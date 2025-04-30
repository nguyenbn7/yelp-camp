import { z } from 'zod';
import { Types } from 'mongoose';

export const campgroundIdSchema = z.object({
	campgroundId: z.string().refine((val) => {
		return Types.ObjectId.isValid(val);
	})
});
