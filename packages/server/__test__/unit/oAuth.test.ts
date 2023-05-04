import {describe, expect, it} from 'vitest';

import {MiddlewareAuth} from '../../src/middlewares/services/oAuth';

describe('Test oAuth service', () => {
	it('should be token valid by service', async () => {
		expect(
			await MiddlewareAuth.authenticator({
				email: 'mr.soulfox-not-exist@gmail.com',
				password: 'userOnlyForTest',
			})
		).toBeTruthy();
	});

	it('should be token invalid by service', async () => {
		expect(
			await MiddlewareAuth.authenticator({email: 'any', password: 'invalid'})
		).toBeFalsy();
	});
});
