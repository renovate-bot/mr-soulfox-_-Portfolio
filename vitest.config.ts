import {defineConfig} from 'vitest/config';

export default defineConfig({
	test: {
		watch: false,
		globals: true,
		coverage: {
			provider: 'c8',
			reporter: ['html', 'json', 'text'],
			all: true,
			include: ['./packages/server/**/*.ts'],
		},
	},
});
