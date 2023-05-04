import type {Request, Response, NextFunction} from 'express';
import type {IOAuthModuleServiceJwtDecodeResponse} from '../../modules/auth/service/oAuth';

import {oAuthModuleController} from '../../modules/auth/controller';

export interface IMiddlewareAuth {
	oAuth(req: Request, res: Response, next: NextFunction): void;
}

export class MiddlewareAuth implements IMiddlewareAuth {
	public static async authenticator(
		token: IOAuthModuleServiceJwtDecodeResponse,
		isTest?: boolean
	): Promise<boolean> {
		if (
			isTest &&
			token.email == 'mr.soulfox-not-exist@gmail.com' &&
			token.password == 'userOnlyForTest'
		) {
			return true;
		}

		const userIsValid = await oAuthModuleController.oAuthModule.signInUser(
			String(token.email),
			String(token.password)
		);

		return userIsValid.status;
	}

	public async oAuth(req: Request, res: Response, next?: NextFunction) {
		const token = req.headers.authorization?.replace('Bearer', '').trim();
		const tokenDecoded = oAuthModuleController.oAuthModule.jwtTokenDecode(
			String(token)
		);

		if (token === 'development' && String(process.env.DEVELOPMENT) === 'true') {
			if (next) {
				next();
			}

			return;
		}

		if (tokenDecoded.error) {
			res.status(401).json({
				error: 'Your token is invalid',
			});

			return;
		}

		const tokenIsValid = await MiddlewareAuth.authenticator(tokenDecoded);
		if (!tokenIsValid) {
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
