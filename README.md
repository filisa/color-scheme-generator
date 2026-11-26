# Color Scheme Generator

A small browser-based app for generating a five-color palette from a selected color and color scheme.

Built with HTML, CSS and vanilla JS.

## Features

- Generates a random starting color and palette when the page loads.
- Lets you choose a color and a palette scheme.
- Displays the returned hex values as color swatches.
- Shows loading and error messages, including accessible live regions.
- Uses [The Color API](https://www.thecolorapi.com/) to generate palettes.

Available schemes include monochrome, monochrome dark/light, analogic, complement, analogic complement, triad, and quad.

## Run locally

The project has no build step or package dependencies. Serve the project directory with a local web server, then open the local address in your browser. For example, with Python installed:

```sh
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

An internet connection is required to request palettes from The Color API.

## Project files

- `index.html` — page structure and form controls.
- `styles.css` — layout and styling, including a small-screen layout.
- `script.js` — random initial color, API requests, and palette rendering.
