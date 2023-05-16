import type {SupabaseClient} from '@supabase/supabase-js';

export interface IDatabaseModuleServiceResponse {
	status: boolean;
	data?: unknown;
	errorMsg?: string;
}

export interface IDatabaseModuleService {
	insert(table: string, insert: unknown): Promise<IDatabaseModuleServiceResponse>;
	select(
		table: string,
		equal: {col: string; row: string}
	): Promise<IDatabaseModuleServiceResponse>;
	selectAll(table: string): Promise<IDatabaseModuleServiceResponse>;
	update(
		table: string,
		equal: {col: string; row: string},
		insert: unknown
	): Promise<IDatabaseModuleServiceResponse>;
	delete(
		table: string,
		equal: {col: string; row: string}
	): Promise<IDatabaseModuleServiceResponse>;
}

export class DatabaseModuleService implements IDatabaseModuleService {
	private client: SupabaseClient;
	private setResponse(error: Error, data?: unknown) {
		if (error) {
			return {
				status: false,
				errorMsg: error.message,
			};
		}

		return {
			status: true,
			data: data,
		};
	}

	constructor(client: SupabaseClient) {
		this.client = client;
	}

	public async insert(
		table: string,
		insert: unknown
	): Promise<IDatabaseModuleServiceResponse> {
		const {data, error} = await this.client.from(table).upsert(insert).select();

		return this.setResponse(new Error(error?.message), data);
	}

	public async select(
		table: string,
		equal: {col: string; row: string}
	): Promise<IDatabaseModuleServiceResponse> {
		const {data, error} = await this.client
			.from(table)
			.select()
			.eq(equal.col, equal.row);

		return this.setResponse(new Error(error?.message), data);
	}

	public async selectAll(table: string): Promise<IDatabaseModuleServiceResponse> {
		const {data, error} = await this.client.from(table).select();

		return this.setResponse(new Error(error?.message), data);
	}

	public async update(
		table: string,
		equal: {col: string; row: string},
		insert: unknown
	): Promise<IDatabaseModuleServiceResponse> {
		const {data, error} = await this.client
			.from(table)
			.update(insert)
			.eq(equal.col, equal.row);

		return this.setResponse(new Error(error?.message), data);
	}

	public async delete(
		table: string,
		equal: {col: string; row: string}
	): Promise<IDatabaseModuleServiceResponse> {
		const {error} = await this.client.from(table).delete().eq(equal.col, equal.row);

		return this.setResponse(new Error(error?.message));
	}
}
