import type {Request, Response} from 'express';

import {databaseModuleController} from '../../../modules/database/controller';

export interface IUserDetailsRoute {
	details(req: Request, res: Response): void;
}

export class UserDetailsRoute implements IUserDetailsRoute {
	public async details(req: Request, res: Response) {
		if (req.query.all == 'true' && !req.query.user) {
			const response = await databaseModuleController.database.selectAll('users');

			res.status(response.status ? 200 : 400).json({
				status: response.status ? 'OK' : 'Error',
				msg: response.errorMsg,
				data: response.data,
			});

			return;
		}

		const response = await databaseModuleController.database.select('users', {
			col: 'username',
			row: String(req.query.user),
		});

		res.status(response.status ? 200 : 400).json({
			status: response.status ? 'OK' : 'Error',
			msg: response.errorMsg,
			data: response.data,
		});
	}
}
