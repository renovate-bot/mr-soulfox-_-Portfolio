import type {Request, Response} from 'express';
import {storageModuleController} from '../../../modules/storage/controller';

export interface IStorageListRoute {
	list(req: Request, res: Response): void;
}

export class StorageListRoute implements IStorageListRoute {
	public async list(req: Request, res: Response): Promise<void> {
		const response = await storageModuleController.storage.listAll(
			req.params.foldername
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
}
