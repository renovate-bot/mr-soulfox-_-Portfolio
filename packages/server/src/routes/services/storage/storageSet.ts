import type {Request, Response} from 'express';

export interface IStorageSetRoute {
	set(req: Request, res: Response): void;
}

export class StorageSetRoute implements IStorageSetRoute {
	public set(_req: Request, res: Response) {
		res.status(200).json({
			status: `Added image`,
		});
	}
}
