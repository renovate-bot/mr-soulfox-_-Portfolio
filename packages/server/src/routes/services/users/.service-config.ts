import {UserDetailsRoute} from './userDetails';
import {UserRepositoryRegistryRoute} from './userRepositoryRegistry';
import {UserRegistryRoute} from './userRegistry';
import {UserConfigRoute} from './userConfig';
import {UserDeleteRoute} from './userDelete';

export const userServiceList = [
	{
		method: 'GET',
		path: '/user/details/:username',
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
	{
		method: 'PUT',
		path: '/:user/config',
		operation: new UserConfigRoute().config,
	},
	{
		method: 'DELETE',
		path: '/:user',
		operation: new UserDeleteRoute().delete,
	},
];
