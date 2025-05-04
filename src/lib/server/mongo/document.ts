import type { Types } from 'mongoose';
import mongoose, { Model, model, Schema, Document } from 'mongoose';

const { models } = mongoose;

// Review schema definition

export interface ReviewSchema {
	body: string;
	rating: number;
	createdDate: Date;
}

const reviewSchema = new Schema<ReviewSchema>({
	body: { type: String },
	rating: { type: Number },
	createdDate: { type: Date, default: Date.now }
});

export const Review =
	(models['Review'] as Model<ReviewSchema>) || model<ReviewSchema>('Review', reviewSchema);

export type ReviewDocument = InstanceType<typeof Review>;

// Campground schema definition

export interface CampgroundSchema {
	title: string;
	price: number;
	description: string;
	location: string;
	image: string;
	reviews: Array<
		Document<unknown, {}, ReviewSchema> &
			ReviewSchema & {
				_id: Types.ObjectId;
			} & {
				__v: number;
			}
	>;
}

const campgroundSchema = new Schema<CampgroundSchema>({
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
	(models['Campground'] as Model<CampgroundSchema>) ||
	model<CampgroundSchema>('Campground', campgroundSchema);

export type CampgroundDocument = InstanceType<typeof Campground>;
