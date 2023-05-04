import type {Request, Response} from 'express';

export interface IStorageGetRoute {
	get(req: Request, res: Response): void;
}

export class StorageGetRoute implements IStorageGetRoute {
	public get(req: Request, res: Response) {
		res.status(200).json({
			status: `Return a image by id (${req.params.foldername}/${req.params.imageID})`,
		});
	}
}
