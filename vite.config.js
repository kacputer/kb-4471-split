import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const runbook = fileURLToPath(new URL('./src/lib/layouts/runbook.svelte', import.meta.url));

export default defineConfig({
  plugins: [
    sveltekit({
      extensions: ['.svelte', '.svx'],
      preprocess: [mdsvex({ extensions: ['.svx'], layout: { runbook } })],
      adapter: adapter({ pages: 'rendered', assets: 'rendered', strict: false }),
      alias: { '#lib': 'src/lib', '#lib/*': 'src/lib/*' },
      prerender: {
        entries: ['/kb', '/kb/incidents/4471', '/kb/incidents/4471-split', '/kb/triage/dedupe', '/kb/decisions/0001-dedupe-by-subject'],
        handleHttpError: 'warn',
      },
    }),
  ],
});
