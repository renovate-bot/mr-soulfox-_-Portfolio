import type {Request, Response, NextFunction} from 'express';

export interface IMiddlewareAuth {
	oAuth(req: Request, res: Response, next: NextFunction): void;
}

export class MiddlewareAuth implements IMiddlewareAuth {
	public static authenticator(token: string): boolean {
		if (token === 'development' && process.env.DEVELOPMENT == 'true') {
			return true;
		}

		return false;
	}

	oAuth(req: Request, res: Response, next?: NextFunction) {
		const token = req.headers.authorization?.replace('Bearer', '');

		if (!MiddlewareAuth.authenticator(String(token))) {
			res.status(401).json({
				error: 'Your token is invalid',
			});

			return;
		}

		if (next) {
			next();
		}
	}
}
