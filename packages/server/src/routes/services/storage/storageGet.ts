import type {Request, Response} from 'express';
import {storageModuleController} from '../../../modules/storage/controller';

export interface IStorageGetRoute {
	get(req: Request, res: Response): void;
}

export class StorageGetRoute implements IStorageGetRoute {
	public async get(req: Request, res: Response): Promise<void> {
		const path = `${req.params.foldername}/${req.params.imageID}`;

		if (String(req.query.signed) === 'true') {
			const isDownload = String(req.query.download) === 'true';

			const response = await storageModuleController.storage.getSignedFiles(
				path,
				isDownload
			);

			res.status(response.status ? 200 : 400).json({
				status: response.status ? 'OK' : 'Error',
				msg: response.msg,
				data: response.data,
			});
		}

		const response = await storageModuleController.storage.getFiles(path);

		res.status(response.status ? 200 : 400).json({
			status: response.status ? 'OK' : 'Error',
			msg: response.msg,
			data: response.data,
		});
	}
}
