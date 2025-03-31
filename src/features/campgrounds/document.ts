import { Review, type Reviewable } from '$features/reviews/document';
import { Model, model, Schema, type Types } from 'mongoose';
import mongoose from 'mongoose';

export interface Campgroundable {
	title: string;
	price: number;
	description: string;
	location: string;
	image: string;
	reviews: Array<
		mongoose.Document<unknown, {}, Reviewable> &
			Reviewable & {
				_id: Types.ObjectId;
			} & {
				__v: number;
			}
	>;
}

const campgroundSchema = new Schema<Campgroundable>({
	title: { type: String },
	price: { type: Number },
	description: { type: String },
	location: { type: String },
	image: { type: String },
	reviews: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Review'
		}
	]
});

campgroundSchema.post('findOneAndDelete', async function (doc) {
	if (doc) {
		await Review.deleteMany({
			_id: {
				$in: doc.reviews
			}
		});
	}
});

export const Campground =
	(mongoose.models['Campground'] as Model<Campgroundable>) ||
	model<Campgroundable>('Campground', campgroundSchema);
