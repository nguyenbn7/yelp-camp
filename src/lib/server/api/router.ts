import { Hono } from 'hono';

import reviews from '$features/reviews/server/api/router';
import campgrounds from '$features/campgrounds/server/api/router';

const app = new Hono()
	.basePath('/api')
	.route('/campgrounds/:campgroundId/reviews', reviews)
	.route('/campgrounds', campgrounds);

export default app;

export type AppAPIType = typeof app;
