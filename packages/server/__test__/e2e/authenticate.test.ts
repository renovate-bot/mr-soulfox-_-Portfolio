import {describe, expect, it} from 'vitest';
import {makeRequest} from '../utils/makeRequest';

describe('Test middleware to authenticate user', () => {
	it('Should be able token is valid', async () => {
		const response = await makeRequest('/health', 'development');
		expect(response.status).toEqual(200);
	});

	it('Should be able token is invalid', async () => {
		const response = await makeRequest('/health', 'invalid');
		expect(response.status).toEqual(401);
	});
});
