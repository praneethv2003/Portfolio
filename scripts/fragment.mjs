// After `vite build`, also emit dist/fragment.html: the same page with the
// <html>/<head>/<body> wrapper stripped. Some hosts (claude.ai artifacts, CMS
// embeds) wrap your markup in their own document skeleton and want a fragment.
// dist/index.html stays a normal, complete page for ordinary hosting.
import { readFileSync, writeFileSync } from 'node:fs'

const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8')
const head = html.match(/<head>([\s\S]*?)<\/head>/i)?.[1] ?? ''
const body = html.match(/<body>([\s\S]*?)<\/body>/i)?.[1] ?? ''

// keep title, font links and inline styles; drop meta tags the host provides
const keep = head
  .replace(/<meta[^>]*>/gi, '')
  .replace(/<link rel="preconnect"[^>]*>/gi, '')
  .trim()

writeFileSync(new URL('../dist/fragment.html', import.meta.url), `${keep}\n${body.trim()}\n`)
console.log('wrote dist/fragment.html')
