import {Router} from 'express';
import {routerSetter} from './routerSetter';
import {routes} from './routers';

class RouterController {
	public initializeRoutes(): Router {
		const router = routerSetter(Router(), routes);

		return router;
	}
}

export const routerController = new RouterController();
