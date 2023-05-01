import type {Request, Response} from 'express';

export interface IConfigGeneralModifierRoute {
	modify(req: Request, res: Response): void;
}

export class ConfigGeneralModifierRoute implements IConfigGeneralModifierRoute {
	public modify(_req: Request, res: Response) {
		res.status(200).json({
			status: 'Modified!',
		});
	}
}
