import {describe, beforeAll, afterAll, expect, it} from 'vitest';
import {makeRequest} from '../utils/makeRequest';

describe('Test middleware to authenticate user', () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let _server: any;

	beforeAll(async () => {
		console.log('Starting test server');
		_server = (await import('../../src/index')).serverInstance;

		await new Promise((resolve) => {
			_server.on('listening', resolve);
		});
	});

	it('Should be able token is valid', async () => {
		const response = await makeRequest('/health', 'development');
		expect(response.status).toEqual(200);
	});

	it('Should be able token is invalid', async () => {
		const response = await makeRequest('/health', 'invalid');
		expect(response.status).toEqual(401);
	});

	afterAll(() => {
		console.log('Closing test server');
		_server.close();
	});
});
