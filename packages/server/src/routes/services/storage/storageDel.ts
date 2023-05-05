import type {Request, Response} from 'express';

import {storageModuleController} from '../../../modules/storage/controller';

export interface IStorageDelRoute {
	del(req: Request, res: Response): void;
}

export class StorageDelRoute implements IStorageDelRoute {
	public async del(req: Request, res: Response): Promise<void> {
		const path = `${req.params.foldername}/${req.params.imageID}`;

		const response = await storageModuleController.storage.delFiles(path);

		if (response.status) {
			res.status(200).json({
				status: 'OK',
				msg: response.msg,
				data: response.data,
			});

			return;
		}

		res.status(400).json({
			status: 'BAD',
			msg: response.msg,
		});
	}
}
