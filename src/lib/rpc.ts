import type { AppAPIType } from '$lib/server/api/router';
import { PUBLIC_API_URL } from '$env/static/public';
import { hc } from 'hono/client';

export const client = hc<AppAPIType>(PUBLIC_API_URL);
