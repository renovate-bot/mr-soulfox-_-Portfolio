import {UserDetailsRoute} from './userDetails';
import {UserRepositoryRegistryRoute} from './userRepositoryRegistry';
import {UserRegistryRoute} from './userRegistry';

export const userServiceList = [
	{
		method: 'GET',
		path: '/user/details',
		operation: new UserDetailsRoute().details,
	},
	{
		method: 'POST',
		path: '/user/registry',
		operation: new UserRegistryRoute().registry,
	},
	{
		method: 'POST',
		path: '/:user/repository/registry',
		operation: new UserRepositoryRegistryRoute().registry,
	},
];
