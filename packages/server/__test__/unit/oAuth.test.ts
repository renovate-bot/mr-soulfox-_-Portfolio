import {describe, expect, it} from 'vitest';
import {MiddlewareAuth} from '../../src/middlewares/services/oAuth';

describe('Test oAuth service', () => {
	it('should be token valid by service (IN DEVELOPMENT)', () => {
		expect(MiddlewareAuth.authenticator('development')).toBeTruthy();
	});

	it('should be token invalid by service', () => {
		expect(MiddlewareAuth.authenticator('invalid')).toBeFalsy();
	});
});
