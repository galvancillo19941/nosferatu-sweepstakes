/* eslint-disable prefer-const */
import * as esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import eslint from 'esbuild-plugin-eslint';
import esbuildPluginTsc from 'esbuild-plugin-tsc';

import sassPlugin2 from 'esbuild-plugin-sass';

// client/main.js
let main_js = await esbuild.context({
  entryPoints: ['client/main.js'],
  bundle: true,
  outfile: 'public/js/main.js',
  logLevel: 'warning',
  sourcemap: true,
  plugins: [
    eslint({ fix: true, })
  ]
});
await main_js.watch();

// client/components/vulkano-webcomponent/main.js
let vulkano_webcomponent = await esbuild.context({
  entryPoints: ['client/components/vulkano-webcomponent/main.js'],
  bundle: true,
  loader: {
    '.css': 'text', // Importa los archivos CSS como texto
    '.woff': 'file', // Configura para manejar archivos .woff
    '.woff2': 'file', // Configura para manejar archivos .woff2
  },
  outfile: 'public/js/vulkano-webcomponent.js',
  logLevel: 'warning',
  sourcemap: true,
  plugins: [
    eslint({ fix: true, }),
    sassPlugin2(), // Usamos el plugin para compilar SCSS a CSS
  ]
});
await vulkano_webcomponent.watch();

// client/components/simple-greeting/main.ts
let ts_component = await esbuild.context({
  entryPoints: ['client/components/simple-greeting/main.ts'],
  bundle: true,
  outfile: 'public/js/simple-greeting.js',
  logLevel: 'warning',
  sourcemap: true,
  plugins: [
    esbuildPluginTsc({ force: true })
  ]
});
await ts_component.watch();

// client/style.scss
let style = await esbuild.context({
  entryPoints: ['client/style.scss'],
  bundle: false,
  outfile: 'public/css/style.css',
  logLevel: 'warning',
  sourcemap: true,
  plugins: [sassPlugin({
    loadPaths: ['node_modules/foundation-sites/scss'],
    embedded: true
  })]
});
await style.watch();

// client/fonts.scss
let styleFonts = await esbuild.context({
  entryPoints: ['client/scss/fonts.scss'],
  bundle: false,
  outfile: 'public/css/fonts.css',
  logLevel: 'warning',
  sourcemap: true,
  plugins: [sassPlugin({
    loadPaths: ['node_modules/foundation-sites/scss'],
    embedded: true
  })]
});
await styleFonts.watch();

console.log('[esbuild] Watching for changes...');
