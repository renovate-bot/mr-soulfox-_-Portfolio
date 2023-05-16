import type {Request, Response} from 'express';

export interface IUserConfigRoute {
	config(req: Request, res: Response): void;
}

export class UserConfigRoute implements IUserConfigRoute {
	public async config(req: Request, res: Response) {
		res.status(200).json({
			status: `Config user ${req.params.user} (${req.query.repo})`,
		});
	}
}
