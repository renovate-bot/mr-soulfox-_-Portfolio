import type {Request, Response} from 'express';

export interface IConfigCurriculumRoute {
	curriculum(req: Request, res: Response): void;
}

export class ConfigCurriculumRoute implements IConfigCurriculumRoute {
	public curriculum(_req: Request, res: Response) {
		res.status(200).json({
			status: 'Curriculum of Marcos',
		});
	}
}
