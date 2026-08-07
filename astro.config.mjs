import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://manuva.app',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  devToolbar: { enabled: false },
});
