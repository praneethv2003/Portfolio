# praneeth-portfolio

Personal site for Praneeth Vedantham. React 18 + Vite, no UI library.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # dist/index.html (single file) + dist/fragment.html
```

## Edit the words

Everything written on the page is in `src/content.js`. Components only lay it out.
Two spots are waiting on you:

- `experience[]` → Pitney Bowes `when` is empty. Add the dates.
- `person.resume` → drop a PDF in `public/` and set the path to show a Résumé button in the hero.

Proofread the project descriptions (`projects[]`) against what you actually built; a couple of the
"How it's built" lines describe the intended design and should match the code.

## Where things live

| file | what |
| --- | --- |
| `src/content.js` | all copy, links, incident list for the game |
| `src/styles.css` | design tokens (`:root`), light/dark themes, every component style |
| `src/components/Cursor.jsx` | ballpoint cursor: dot, lagging ring with labels, canvas ink trail |
| `src/components/Filings.jsx` | the field of marks behind the hero that turns toward the pointer |
| `src/components/OnCall.jsx` | the on-call routing game |
| `src/components/Sections.jsx` | hero and every content section |
| `src/App.jsx` | rail navigation, top bar, theme toggle |

## Deploy

The build is a single `dist/index.html`, so anything that serves static files works.

- **Vercel / Netlify**: import the repo, framework = Vite, build = `npm run build`, output = `dist`.
- **GitHub Pages**: set `base: '/<repo-name>/'` in `vite.config.js` if the site is not at the domain root, build, and publish `dist`.
- **Your own domain**: upload `dist/index.html`. That's the whole site.

Fonts load from Google Fonts (Inconsolata, Lato). To self-host them,
download the families and replace the `<link>` in `index.html` with `@font-face` rules in `styles.css`.

`dist/fragment.html` is the same page without the `<html>/<head>/<body>` wrapper, for hosts that
wrap your markup in their own document. Ignore it for normal hosting.
