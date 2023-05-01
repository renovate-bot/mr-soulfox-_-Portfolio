import type {Request, Response} from 'express';

export interface IConfigTokensRoute {
	token(req: Request, res: Response): void;
}

export class ConfigTokensRoute implements IConfigTokensRoute {
	public token(_req: Request, res: Response) {
		res.status(200).json({
			status: 'Token! (123-568)',
		});
	}
}
