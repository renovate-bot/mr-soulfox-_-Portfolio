import type {IMiddlewareAuth} from '../services/oAuth';
import {MiddlewareAuth} from '../services/oAuth';
import {Router} from 'express';

interface MiddlewareControllerInjection {
	authenticator: IMiddlewareAuth;
}

class MiddlewareController {
	private authMiddleware: IMiddlewareAuth;

	constructor(injection: MiddlewareControllerInjection) {
		this.authMiddleware = injection.authenticator;
	}

	initializeMiddlewares(): Router {
		const router = Router();

		router.use(this.authMiddleware.oAuth);

		return router;
	}
}

const middlewareControllerInjection: MiddlewareControllerInjection = {
	authenticator: new MiddlewareAuth(),
};

export const middlewareController = new MiddlewareController(
	middlewareControllerInjection
);
