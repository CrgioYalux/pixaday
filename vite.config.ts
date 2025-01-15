import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		extensions: ['.ts', '.tsx'],
		alias: [
			{
				find: '@/utils',
				replacement: path.resolve(__dirname, 'src/utils'),
			},
			{
				find: '@/components',
				replacement: path.resolve(__dirname, 'src/components'),
			},
			{
				find: '@/color-palette',
				replacement: path.resolve(
					__dirname,
					'src/modules/color-palette'
				),
			},
			{
				find: '@/color-matrix',
				replacement: path.resolve(
					__dirname,
					'src/modules/color-matrix'
				),
			},
			{
				find: '@/color-matrix-tools',
				replacement: path.resolve(
					__dirname,
					'src/modules/color-matrix-tools'
				),
			},
			{
				find: '@/framing',
				replacement: path.resolve(__dirname, 'src/modules/framing'),
			},
		],
	},
});
