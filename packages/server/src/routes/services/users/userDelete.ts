import type {Request, Response} from 'express';
import {databaseModuleController} from '../../../modules/database/controller';

export interface IUserDeleteRoute {
	delete(req: Request, res: Response): void;
}

export class UserDeleteRoute implements IUserDeleteRoute {
	public async delete(req: Request, res: Response) {
		const response = await databaseModuleController.database.delete('users', {
			col: 'username',
			row: req.params.user,
		});

		res.status(response.status ? 200 : 400).json({
			status: response.status ? 'OK' : 'Error',
			msg: response.errorMsg,
			data: response.data,
		});
	}
}
