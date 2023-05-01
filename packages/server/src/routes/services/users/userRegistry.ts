import type {Request, Response} from 'express';

export interface IUserRegistryRoute {
	registry(req: Request, res: Response): void;
}

export class UserRegistryRoute implements IUserRegistryRoute {
	public registry(_req: Request, res: Response) {
		res.status(200).json({
			status: 'User Registry',
		});
	}
}
