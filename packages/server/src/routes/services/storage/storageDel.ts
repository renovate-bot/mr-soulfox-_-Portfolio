import type {Request, Response} from 'express';

export interface IStorageDelRoute {
	del(req: Request, res: Response): void;
}

export class StorageDelRoute implements IStorageDelRoute {
	public del(req: Request, res: Response) {
		res.status(200).json({
			status: `Remove image by id (${req.params.foldername}/${req.params.imageID})`,
		});
	}
}
