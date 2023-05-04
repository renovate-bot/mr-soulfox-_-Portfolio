import dotenv from 'dotenv';

import {server} from './config';
import {pino} from './utils';

dotenv.config();

const port = process.env.PORT || '3000';

const serverInstance = server.listen(port, () => {
	console.log(`listening on port ${port}.`);
});

serverInstance.on('listening', () => {
	pino.info({port: port, address: serverInstance.address}, `Server listening`);
	pino.trace({port: port, address: serverInstance.address}, `Server listening`);
});

serverInstance.on('error', () => {
	pino.info(
		{port: port, address: serverInstance.address},
		`Error occurred in ${serverInstance.address}:${port}`
	);
});

serverInstance.on('close', () => {
	pino.info({port: port, address: serverInstance.address}, `Server closed successfully`);
});
