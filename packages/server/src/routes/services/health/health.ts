import type {Request, Response} from 'express';

export interface IHealthRoute {
	health(req: Request, res: Response): void;
}

export class HealthRoute implements IHealthRoute {
	public health(_req: Request, res: Response): void {
		res.status(200).json({
			status: 'OK',
		});
	}
}
