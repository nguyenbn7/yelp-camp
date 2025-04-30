import type { Handle } from '@sveltejs/kit';
import { connect } from 'mongoose';
import { MONGO_URL } from '$env/static/private';

async function connectMongo() {
	try {
		await connect(MONGO_URL);
	} catch (error) {
		console.error('Connection error:');
		throw error;
	}
}

connectMongo();

export const handle: Handle = async ({ event, resolve }) => {
	return resolve(event);
};
