import {createClient} from '@supabase/supabase-js';

import {OAuthModule} from '../service';

class OAuthModuleController {
	public oAuthModule: OAuthModule;

	constructor() {
		const databaseUrl = String(process.env.DATABASE_URL);
		const databaseKey = String(process.env.DATABASE_KEY);

		const client = createClient(databaseUrl, databaseKey);

		this.oAuthModule = new OAuthModule(client);
	}
}

export const oAuthModuleController = new OAuthModuleController();
