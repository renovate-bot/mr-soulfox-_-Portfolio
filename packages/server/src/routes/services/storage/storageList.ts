import type {Request, Response} from 'express';

export interface IStorageListRoute {
	list(req: Request, res: Response): void;
}

export class StorageListRoute implements IStorageListRoute {
	public list(req: Request, res: Response) {
		res.status(200).json({
			status: `Return a image list with files in a folder (${req.params.foldername})`,
		});
	}
}
