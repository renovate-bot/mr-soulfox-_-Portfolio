import {StorageGetRoute} from './storageGet';
import {StorageDelRoute} from './storageDel';
import {StorageSetRoute} from './storageSet';

export const storageServiceList = [
	{
		method: 'GET',
		path: '/storage/get/:imageID',
		operation: new StorageGetRoute().get,
	},
	{
		method: 'DELETE',
		path: '/storage/del/:imageID',
		operation: new StorageDelRoute().del,
	},
	{
		method: 'POST',
		path: '/storage/set',
		operation: new StorageSetRoute().set,
	},
];
