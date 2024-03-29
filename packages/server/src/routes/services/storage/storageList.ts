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

		res.status(response.status ? 200 : 400).json({
			status: response.status ? 'OK' : 'Error',
			msg: response.msg,
			data: response.data,
		});
	}
}
