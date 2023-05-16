import type {Request, Response} from 'express';

import {storageModuleController} from '../../../modules/storage/controller';

export interface IStorageDelRoute {
	del(req: Request, res: Response): void;
}

export class StorageDelRoute implements IStorageDelRoute {
	public async del(req: Request, res: Response): Promise<void> {
		const path = `${req.params.foldername}/${req.params.imageID}`;

		const response = await storageModuleController.storage.delFiles(path);

		res.status(response.status ? 200 : 400).json({
			status: response.status ? 'OK' : 'Error',
			msg: response.msg,
			data: response.data,
		});
	}
}
