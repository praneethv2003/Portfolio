import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// The single-file plugin inlines the JS and CSS into dist/index.html so the
// site can be hosted anywhere (GitHub Pages, Vercel, a plain S3 bucket) with
// zero extra files. Remove it if you'd rather have a normal chunked build.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    target: 'es2019',
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
  },
})
