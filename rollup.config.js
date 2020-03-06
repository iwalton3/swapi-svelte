import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';
import sveltePreprocess from 'svelte-preprocess';

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'esm',
		name: 'app',
		file: 'public/bundle.js'
	},
	plugins: [
		svelte({
			preprocess: sveltePreprocess(),
			dev: true,
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
			sourceMap: true
		}),
		// Watch the `public` directory and refresh the
		// browser on changes
		livereload('public'),
	],
	watch: {
		clearScreen: false
	}
};
