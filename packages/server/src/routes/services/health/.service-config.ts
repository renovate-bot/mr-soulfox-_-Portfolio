import {HealthRoute} from './health';

export const healthServiceList = [
	{
		method: 'GET',
		path: '/health',
		operation: new HealthRoute().health,
	},
];
