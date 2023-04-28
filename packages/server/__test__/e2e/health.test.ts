import {describe, expect, it} from 'vitest';
import {makeRequest} from '../utils/makeRequest';

describe('Test /health router to check if server is alive', () => {
	it('Should be able alive', async () => {
		const response = await makeRequest('/health', 'development');
		console.log(response.json);

		expect(response.status).toEqual(200);
	});
});
