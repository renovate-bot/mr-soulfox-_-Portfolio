import type {SupabaseClient} from '@supabase/supabase-js';

import fs from 'fs';

export interface IStorageModuleServiceResponse {
	status: boolean;
	msg: string;
	data?: unknown;
}

export interface IStorageModuleServiceSetFileParams {
	type: string;
	name: string;
	filepath: string;
	contentType: string;
	encoding: BufferEncoding;
}

export interface IStorageModuleService {
	getFiles(path: string): Promise<IStorageModuleServiceResponse>;
	getSignedFiles(
		path: string,
		download: boolean
	): Promise<IStorageModuleServiceResponse>;
	setFiles(
		params: IStorageModuleServiceSetFileParams
	): Promise<IStorageModuleServiceResponse>;
	delFiles(path: string): Promise<IStorageModuleServiceResponse>;
	listAll(folder: string): Promise<IStorageModuleServiceResponse>;
}

export class StorageModuleService implements IStorageModuleService {
	private client: SupabaseClient;
	private createResponse(
		error: unknown,
		msg: string,
		data?: unknown
	): IStorageModuleServiceResponse {
		if (error) {
			return {
				status: false,
				msg: msg,
			};
		}

		return {
			status: true,
			msg: msg,
			data: data,
		};
	}

	constructor(client: SupabaseClient) {
		this.client = client;
	}

	public async getFiles(path: string): Promise<IStorageModuleServiceResponse> {
		const {error} = await this.client.storage
			.from(String(process.env.BUCKET_NAME))
			.download(path);

		return this.createResponse(
			error,
			error?.message || `File ${path.split('/')[1]} downloaded`
		);
	}

	public async getSignedFiles(
		path: string,
		download: boolean
	): Promise<IStorageModuleServiceResponse> {
		const {data, error} = await this.client.storage
			.from(String(process.env.BUCKET_NAME))
			.createSignedUrl(path, 60 * 60 * 24, {
				download: download,
			});

		return this.createResponse(error, error?.message || `File in ${path} signed`, {
			url: data?.signedUrl,
		});
	}

	public async setFiles({
		filepath,
		encoding,
		name,
		type,
		contentType,
	}: IStorageModuleServiceSetFileParams): Promise<IStorageModuleServiceResponse> {
		const file = Buffer.from(
			fs.readFileSync(filepath, {
				encoding: encoding,
			}),
			encoding
		);

		const {data, error} = await this.client.storage
			.from(String(process.env.BUCKET_NAME))
			.upload(`${type}/${name}`, file, {
				cacheControl: '3900',
				upsert: true,
				contentType: contentType,
			});

		fs.rmSync(filepath, {
			maxRetries: 10,
			recursive: true,
		});

		return this.createResponse(
			error,
			error?.message || `File saved successfully in ${data?.path}`,
			{filepath: data?.path}
		);
	}

	public async delFiles(path: string): Promise<IStorageModuleServiceResponse> {
		const {data, error} = await this.client.storage
			.from(String(process.env.BUCKET_NAME))
			.remove([path]);

		return this.createResponse(
			error,
			error?.message || `file in ${path} deleted with success`,
			data
		);
	}

	public async listAll(
		folder: string,
		offset?: number
	): Promise<IStorageModuleServiceResponse> {
		const {data, error} = await this.client.storage
			.from(String(process.env.BUCKET_NAME))
			.list(folder, {
				limit: 50,
				offset: offset || 0,
				sortBy: {column: 'name', order: 'asc'},
			});

		return this.createResponse(error, error?.message || `All files in ${folder}`, data);
	}
}
