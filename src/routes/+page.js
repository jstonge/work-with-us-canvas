import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';

export const prerender = true;

export function load() {
	// Redirect root to main canvas
	throw redirect(307, `${base}/main`);
}
