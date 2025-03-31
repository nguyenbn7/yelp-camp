import mongoose, { model, type Model, Schema } from 'mongoose';

export interface ReviewRequestModel {
	body: string;
	rating: number;
}

export interface Reviewable {
	body: string;
	rating: number;
	createdDate: Date;
}

const reviewSchema = new Schema<Reviewable>({
	body: { type: String },
	rating: { type: Number },
	createdDate: { type: Date, default: Date.now }
});

export const Review =
	(mongoose.models['Review'] as Model<Reviewable>) || model<Reviewable>('Review', reviewSchema);
