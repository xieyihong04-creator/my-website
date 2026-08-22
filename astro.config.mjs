// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://your-portfolio.vercel.app',
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en',
    prefixDefaultLocale: false,
    routing: {
      prefixOtherLocales: true,
    },
  },
});
