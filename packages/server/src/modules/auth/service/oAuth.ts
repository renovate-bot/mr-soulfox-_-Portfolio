import type {SupabaseClient} from '@supabase/supabase-js';

import jwt from 'jsonwebtoken';

export interface IOAuthModuleServiceResponse {
	status: boolean;
	data?: unknown;
	errorMsg?: string;
}

export interface IOAuthModuleServiceJwtDecodeResponse {
	email?: string;
	password?: string;
	error?: string;
}

export interface IOAuthModuleService {
	signInUser(email: string, password: string): Promise<IOAuthModuleServiceResponse>;
	jwtTokenDecode(token: string): string | jwt.JwtPayload;
}

export class OAuthModuleService implements IOAuthModuleService {
	private client: SupabaseClient;

	constructor(client: SupabaseClient) {
		this.client = client;
	}

	public jwtTokenDecode(token: string): IOAuthModuleServiceJwtDecodeResponse {
		const decoded = jwt.decode(token);

		if (typeof decoded != 'string' && decoded) {
			return {
				email: decoded.sub,
				password: decoded.password,
			};
		}

		return {
			error: 'Invalid;',
		};
	}

	public async signInUser(
		email: string,
		password: string
	): Promise<IOAuthModuleServiceResponse> {
		const {data, error} = await this.client.auth.signInWithPassword({
			email,
			password,
		});

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
}
