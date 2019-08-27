import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import polyfill from 'rollup-plugin-polyfill';
import postcss from 'rollup-plugin-postcss';
import { sass } from 'svelte-preprocess-sass';

export default [
	{
		input: 'src/main.js',
		output: {
			sourcemap: false,
			format: 'esm',
			name: 'app',
			file: 'public/bundle.js'
		},
		plugins: [
			svelte({
				preprocess: {
					style: sass(),
				},
				// enable run-time checks when not in production
				dev: false,
				emitCss: true
			}),
	
			// If you have external dependencies installed from
			// npm, you'll most likely need these plugins. In
			// some cases you'll need additional configuration —
			// consult the documentation for details:
			// https://github.com/rollup/rollup-plugin-commonjs
			resolve({
				browser: true,
				dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
			}),
			commonjs(),
			postcss({
				use: [
					['sass', {
						includePaths: ['node_modules', 'src/theme']
					}]
				],
				extract: true,
				minimize: true
			}),
			terser({
				module: true
			})
		],
		watch: {
			clearScreen: false
		}
	},
	{
		input: 'src/main.js',
		output: {
			sourcemap: false,
			format: 'iife',
			name: 'app',
			file: 'public/bundle.legacy.js'
		},
		plugins: [
			svelte({
				preprocess: {
					style: sass(),
				},
				// enable run-time checks when not in production
				dev: false,
				emitCss: true
			}),
	
			// If you have external dependencies installed from
			// npm, you'll most likely need these plugins. In
			// some cases you'll need additional configuration —
			// consult the documentation for details:
			// https://github.com/rollup/rollup-plugin-commonjs
			resolve({
				browser: true,
				dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
			}),
			commonjs(),
			babel({
				extensions: ['.js', '.mjs', '.html', '.svelte'],
				exclude: [
					'node_modules/@babel/**',
					'node_modules/core-js/**'
				],
				runtimeHelpers: true,
				presets: [
					['@babel/preset-env', {
						targets: '> 0.25%, not dead',
						useBuiltIns: 'usage',
  						corejs: 3
					}]
				]
			}),
			polyfill(['whatwg-fetch']),
			// Yes this is run twice...
			postcss({
				use: [
					['sass', {
						includePaths: ['node_modules', 'src/theme']
					}]
				],
				extract: true,
				minimize: true
			}),
			terser()
		],
		watch: {
			clearScreen: false
		}
	}
];
