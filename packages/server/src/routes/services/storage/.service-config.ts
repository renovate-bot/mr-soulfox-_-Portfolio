import {StorageGetRoute} from './storageGet';
import {StorageListRoute} from './storageList';
import {StorageDelRoute} from './storageDel';
import {StorageSetRoute} from './storageSet';

export const storageServiceList = [
	{
		method: 'GET',
		path: '/storage/get/:foldername/:imageID',
		operation: new StorageGetRoute().get,
	},
	{
		method: 'GET',
		path: '/storage/list/:foldername',
		operation: new StorageListRoute().list,
	},
	{
		method: 'DELETE',
		path: '/storage/del/:foldername/:imageID',
		operation: new StorageDelRoute().del,
	},
	{
		method: 'POST',
		path: '/storage/set/:foldername',
		operation: new StorageSetRoute().set,
		isStorage: true,
	},
];
