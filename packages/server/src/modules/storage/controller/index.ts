import {createClient} from '@supabase/supabase-js';

import {StorageModule} from '../services';

class StorageModuleController {
	public storage: StorageModule;

	constructor() {
		const databaseUrl = String(process.env.DATABASE_URL);
		const databaseKey = String(process.env.DATABASE_KEY);

		const client = createClient(databaseUrl, databaseKey);

		this.storage = new StorageModule(client);
	}
}

export const storageModuleController = new StorageModuleController();
