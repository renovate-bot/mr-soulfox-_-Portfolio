import {createClient} from '@supabase/supabase-js';

import {DatabaseModule} from '../services';

class DatabaseModuleController {
	public database: DatabaseModule;

	constructor() {
		const databaseUrl = String(process.env.DATABASE_URL);
		const databaseKey = String(process.env.DATABASE_KEY);

		const client = createClient(databaseUrl, databaseKey);

		this.database = new DatabaseModule(client);
	}
}

export const databaseModuleController = new DatabaseModuleController();
