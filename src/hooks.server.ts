import { connect } from 'mongoose';
import type { Handle } from '@sveltejs/kit';
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
