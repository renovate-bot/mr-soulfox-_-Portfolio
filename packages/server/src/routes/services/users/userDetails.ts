import type {Request, Response} from 'express';

export interface IUserDetailsRoute {
	details(req: Request, res: Response): void;
}

export class UserDetailsRoute implements IUserDetailsRoute {
	public details(_req: Request, res: Response) {
		res.status(200).json({
			status: 'User Details',
		});
	}
}
