<script>
	import { onMount, tick } from 'svelte';
	import { base } from '$app/paths';
	import Markdown from 'svelte-exmarkdown';
	import { gfmPlugin } from 'svelte-exmarkdown/gfm';
	import '$lib/canvas.css';

	const plugins = [gfmPlugin()];

	let canvasData = $state(null);
	let error = $state(null);
	let fileContents = $state({});

	// Helper to load scripts dynamically
	function loadScript(src) {
		return new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.src = src;
			script.onload = resolve;
			script.onerror = reject;
			document.head.appendChild(script);
		});
	}

	onMount(async () => {
		// Set body ID and styles for canvas.js
		document.body.id = 'home';
		document.body.style.setProperty('--scale', '1');
		document.body.style.setProperty('--pan-x', '0px');
		document.body.style.setProperty('--pan-y', '0px');

		try {
			// Get canvas name from URL hash or query parameter, default to 'main.canvas'
			// Supports both /#canvas-name and ?canvas=canvas-name
			let canvasFile = window.location.hash.slice(1); // Remove the #
			if (!canvasFile) {
				const urlParams = new URLSearchParams(window.location.search);
				canvasFile = urlParams.get('canvas') || 'main.canvas';
			}
			// Add .canvas extension if not present
			if (!canvasFile.endsWith('.canvas')) {
				canvasFile += '.canvas';
			}

			// Files in static/ are served at root
			const response = await fetch(`${base}/${canvasFile}`);
			if (!response.ok) throw new Error('Canvas file not found');
			canvasData = await response.json();

			// Load markdown file contents
			if (canvasData.nodes) {
				for (const node of canvasData.nodes) {
					if (node.type === 'file' && node.file.endsWith('.md')) {
						try {
							// Files in static/ are served at root, not /static/
							const mdResponse = await fetch(`${base}/${node.file}`);
							if (mdResponse.ok) {
								let content = await mdResponse.text();
								// Strip YAML frontmatter
								content = content.replace(/^---\n[\s\S]*?\n---\n/, '');
								// Strip leading h1 header to avoid duplication with card title
								content = content.replace(/^#\s+.*\n+/, '');
								fileContents[node.id] = content;
							}
						} catch (e) {
							console.warn(`Could not load ${node.file}:`, e);
						}
					}
				}
			}

			// Wait for all nodes to be rendered in DOM
			await tick();
			await new Promise(resolve => setTimeout(resolve, 100));

			// Store edges globally BEFORE loading canvas.js
			window.edges = canvasData.edges || [];

			// Load scripts after DOM is ready
			await loadScript(`${base}/prism.js`);
			await loadScript(`${base}/canvas.js`);

			// Wait a bit for canvas.js to initialize
			await new Promise(resolve => setTimeout(resolve, 100));

			// Initialize canvas.js functions
			if (typeof adjustCanvasToViewport === 'function') {
				adjustCanvasToViewport();
			}
			if (typeof drawEdges === 'function') {
				drawEdges();
			}
			if (typeof updateCanvasData === 'function') {
				updateCanvasData();
			}

			// Manually set up drag handlers for dynamically created nodes
			document.querySelectorAll('.node .node-name').forEach(nodeName => {
				nodeName.addEventListener('mousedown', function(e) {
					if (window.isSpacePressed) return;
					window.isDragging = true;
					window.startX = e.clientX;
					window.startY = e.clientY;
					window.selectedElement = this.parentElement;
					window.selectedElement.classList.add('is-dragging');
				});
			});
		} catch (e) {
			error = e.message;
			console.error('Error loading canvas:', e);
		}
	});
</script>

<svelte:head>
	<title>JSON Canvas Viewer</title>
</svelte:head>

<div id="container">
	<div id="canvas-container">
		<svg id="canvas-edges" preserveAspectRatio="none">
			<defs>
				<marker id="arrowhead" viewBox="0 0 10 10" refX="0" refY="5" markerWidth="6" markerHeight="6" orient="auto">
					<path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"/>
				</marker>
			</defs>
			<g id="edge-paths"></g>
		</svg>

		<div id="canvas-nodes">
			{#if error}
				<div style="padding: 20px; color: red;">
					Error: {error}
				</div>
			{:else if canvasData}
				{#each canvasData.nodes as node}
					<node
						id={node.id}
						class="node {node.type === 'file' ? 'node-link' : 'node-' + node.type}"
						data-node-type={node.type}
						style="left: {node.x}px; top: {node.y}px; width: {node.width}px; height: {node.height}px;"
					>
						<div class="node-name">
							{#if node.type === 'file'}
								{node.file.replace(/\.md$/, '')}
							{/if}
						</div>

						{#if node.type === 'text'}
							<div class="node-text-content">
								{@html node.text || ''}
							</div>
						{:else if node.type === 'file'}
							{#if fileContents[node.id]}
								<div class="node-text-content">
									<h1>{node.file.replace(/\.md$/, '')}</h1>
								<Markdown md={fileContents[node.id]} {plugins} />
								</div>
							{:else}
								<div class="node-text-content">
									<p style="color: gray;">Loading {node.file}...</p>
								</div>
							{/if}
						{:else if node.type === 'link'}
							<a href={node.url} target="_blank" rel="noopener noreferrer">
								{node.url}
							</a>
						{/if}
					</node>
				{/each}
			{:else}
				<div style="padding: 20px;">Loading canvas...</div>
			{/if}
		</div>

		<div id="output" class="theme-dark hidden">
			<div class="code-header">
				<span class="language">JSON Canvas</span>
				<span class="close-output">×</span>
			</div>
			<div id="output-code">
				<pre><code class="language-json" id="positionsOutput"></code></pre>
			</div>
			<div class="code-footer">
				<button class="button-copy">Copy code</button>
				<button class="button-download">Download file</button>
			</div>
		</div>

		<div id="controls">
			<div id="zoom-controls">
				<button id="toggle-output">Toggle output</button>
				<button id="zoom-out">Zoom out</button>
				<button id="zoom-in">Zoom in</button>
				<button id="zoom-reset">Reset</button>
			</div>
		</div>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}

	:global(.node-text-content) {
		overflow-y: auto;
		overflow-x: hidden;
		padding: 0 0.5rem 0 1rem;
		height: 100%;
		box-sizing: border-box;
		position: relative;
	}

	:global(.node-text-content > *:first-child) {
		margin-top: 1rem;
	}

	:global(.node-text-content > *:last-child) {
		margin-bottom: 1rem;
	}

	:global(.node) {
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	:global(.node-text) {
		overflow: visible;
	}

	:global(#canvas-edges path) {
		stroke: var(--color-ui-3, #5E0641);
		stroke-width: 2px;
		fill: none;
	}

	:global(#arrowhead polygon) {
		fill: var(--color-ui-3, #5E0641);
	}
</style>
