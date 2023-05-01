import type {Request, Response} from 'express';

export interface IConfigTranslationRoute {
	translation(req: Request, res: Response): void;
}

export class ConfigTranslationRoute implements IConfigTranslationRoute {
	public translation(_req: Request, res: Response) {
		res.status(200).json({
			status: 'Ingles - Portuguese - Spanish',
		});
	}
}
