import { canvases } from '$lib/canvases.js';
import { error } from '@sveltejs/kit';

export const prerender = true;

export function entries() {
	// Generate a route for each canvas
	return canvases.map(canvas => ({ canvas: canvas.name }));
}

export function load({ params }) {
	const canvas = canvases.find(c => c.name === params.canvas);

	if (!canvas) {
		throw error(404, 'Canvas not found');
	}

	return {
		canvasName: canvas.name,
		canvasTitle: canvas.title,
		canvasFile: canvas.file
	};
}
