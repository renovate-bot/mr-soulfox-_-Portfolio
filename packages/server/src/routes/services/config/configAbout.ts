import type {Request, Response} from 'express';

export interface IConfigAboutRoute {
	modify(req: Request, res: Response): void;
}

export class ConfigAboutRoute implements IConfigAboutRoute {
	public modify(_req: Request, res: Response) {
		res.status(200).json({
			status: 'About me!',
		});
	}
}
