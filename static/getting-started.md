1. Create markdown files for each node
2. Reference them in `.layouts/canvas.html`
3. Add connections with edges
4. Push to GitHub   

We use sveltekit to create a static website.

Your canvas will be live at:
`https://GITHUB-USERNAME/GITHUB-REPO/`

The specs of the canvas format can be found [here](https://jsoncanvas.org/spec/1.0/).

#### Formatting

We are using [svelte-exmarkdown](https://www.npmjs.com/package/svelte-exmarkdown) as markdown formatter, which allow Math and equations that are supported by the obisidian app, e.g. $f(x) \propto ax^{-\kappa}$ . 