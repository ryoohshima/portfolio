// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://ryoohshima.com',

  trailingSlash: 'never',
  compressHTML: true,
  integrations: [icon()],

  // microCMS の認証情報。SSG なのでビルド時のみ解決され、配信物には含まれない。
  env: {
    schema: {
      MICROCMS_SERVICE_DOMAIN: envField.string({ context: 'server', access: 'secret' }),
      MICROCMS_API_KEY: envField.string({ context: 'server', access: 'secret' }),
    },
  },

  // microCMS の画像 CDN をビルド時最適化の対象として許可する。
  image: {
    domains: ['images.microcms-assets.io'],
  },

  build: {
    inlineStylesheets: 'auto',
  },

  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
    },
  },
});
