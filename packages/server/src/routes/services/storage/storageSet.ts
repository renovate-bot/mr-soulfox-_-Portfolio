import type {Request, Response} from 'express';
import type {IStorageModuleServiceSetFileParams} from '../../../modules/storage/services/storage';

import {storageModuleController} from '../../../modules/storage/controller';

export interface IStorageSetRoute {
	set(req: Request, res: Response): void;
}

export class StorageSetRoute implements IStorageSetRoute {
	public async set(req: Request, res: Response): Promise<void> {
		const file = req.file;
		const folder = req.params.foldername;

		const setFileObject: IStorageModuleServiceSetFileParams = {
			type: String(folder),
			name: String(file?.filename),
			filepath: String(file?.path),
			contentType: String(file?.mimetype),
			encoding: 'base64',
		};

		const response = await storageModuleController.storage.setFiles(setFileObject);

		if (response.status) {
			res.status(200).json({
				status: `OK`,
				msg: response.msg,
				data: response.data,
			});

			return;
		}

		res.status(400).json({
			status: `BAD`,
			msg: response.msg,
			data: response.data,
		});
	}
}
