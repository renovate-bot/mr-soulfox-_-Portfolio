import type {Router} from 'express';

export interface RouterSpec {
	method: string;
	path: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	operation: any;
}

export interface RouterSpecSet {
	all: Array<RouterSpec>;
}

export function routerSetter(router: Router, set: RouterSpecSet) {
	set.all.forEach((spec) => {
		if (!spec) {
			return;
		}

		if (String(spec.method).toUpperCase() === 'GET') {
			router.get(spec.path, spec.operation);
		}

		if (String(spec.method).toUpperCase() === 'POST') {
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
