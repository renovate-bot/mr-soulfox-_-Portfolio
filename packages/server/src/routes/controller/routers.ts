import type {RouterSpecSet} from './routerSetter';
import {healthServiceList} from '../services/health';
import {userServiceList} from '../services/users';
import {configServiceList} from '../services/config';
import {storageServiceList} from '../services/storage';

export const routes: RouterSpecSet = {
	all: [
		...healthServiceList,
		...userServiceList,
		...configServiceList,
		...storageServiceList,
	],
};
