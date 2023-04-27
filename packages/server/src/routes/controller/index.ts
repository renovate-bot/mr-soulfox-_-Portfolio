import type {IHealthRoute} from '../services/health';
import {Router} from 'express';
import {HealthRoute} from '../services/health';

interface RouterControllerInjection {
	healthRoute: IHealthRoute;
}

class RouterController {
	private healthRoute: IHealthRoute;

	constructor(injection: RouterControllerInjection) {
		this.healthRoute = injection.healthRoute;
	}

	public initializeRoutes(): Router {
		const router = Router();

		router.get('/health', this.healthRoute.health);

		return router;
	}
}

const routerControllerInjection: RouterControllerInjection = {
	healthRoute: new HealthRoute(),
};

export const routerController = new RouterController(routerControllerInjection);
