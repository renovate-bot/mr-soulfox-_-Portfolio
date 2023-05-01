import type {Request, Response} from 'express';

export interface IUserRepositoryRegistryRoute {
	registry(req: Request, res: Response): void;
}

export class UserRepositoryRegistryRoute implements IUserRepositoryRegistryRoute {
	public registry(req: Request, res: Response) {
		res.status(200).json({
			status: `Registry new repository in ${req.params.user}`,
		});
	}
}
