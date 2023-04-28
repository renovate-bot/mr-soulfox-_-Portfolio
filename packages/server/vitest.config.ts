import {defineConfig} from 'vitest/config';

export default defineConfig({
	test: {
		watch: false,
		globals: true,
		globalSetup: ['./__test__/utils/setup/testServer.ts'],
	},
});
