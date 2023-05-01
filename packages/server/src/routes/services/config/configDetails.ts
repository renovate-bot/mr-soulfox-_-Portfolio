import type {Request, Response} from 'express';

export interface IConfigDetailsRoute {
	details(req: Request, res: Response): void;
}

export class ConfigDetailsRoute implements IConfigDetailsRoute {
	public details(_req: Request, res: Response) {
		res.status(200).json({
			status: 'All config',
		});
	}
}
