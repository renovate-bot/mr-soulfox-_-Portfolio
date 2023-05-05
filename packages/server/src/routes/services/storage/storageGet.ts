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

		const response = await storageModuleController.storage.getFiles(path);

		if (response.status) {
			res.status(200).json({
				status: 'OK',
				msg: response.msg,
			});

			return;
		}

		res.status(400).json({
			status: 'BAD',
			msg: response.msg,
		});
	}
}
