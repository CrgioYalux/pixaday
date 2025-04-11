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
				find: '@/types',
				replacement: path.resolve(__dirname, 'src/modules/types.ts'),
			},
			{
				find: '@/components',
				replacement: path.resolve(__dirname, 'src/components'),
			},
			{
				find: '@/core',
				replacement: path.resolve(__dirname, 'src/core'),
			},
			{
				find: '@/react-adapter',
				replacement: path.resolve(__dirname, 'src/react-adapter'),
			},
		],
	},
});
