import {Router} from 'express';

import {routes} from '../services';
import {upload} from '../../config';

export interface RouterSpec {
	method: string;
	path: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	operation: any;
	isStorage?: boolean;
}

export interface RouterSpecSet {
	all: Array<RouterSpec>;
}

class RouterController {
	private routerSetter(router: Router, set: RouterSpecSet) {
		set.all.forEach((spec) => {
			if (!spec) {
				return;
			}

			if (String(spec.method).toUpperCase() === 'GET') {
				router.get(spec.path, spec.operation);
			}

			if (String(spec.method).toUpperCase() === 'POST') {
				if (spec.isStorage) {
					router.post(spec.path, upload.single('portfolio-file'), spec.operation);

					return;
				}

				router.post(spec.path, spec.operation);
			}

			if (String(spec.method).toUpperCase() === 'PUT') {
				router.put(spec.path, spec.operation);
			}

			if (String(spec.method).toUpperCase() === 'DELETE') {
				router.delete(spec.path, spec.operation);
			}
		});

		return router;
	}

	public initializeRoutes(): Router {
		const router = this.routerSetter(Router(), routes);

		return router;
	}
}

export const routerController = new RouterController();
