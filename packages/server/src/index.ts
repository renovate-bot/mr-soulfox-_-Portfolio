import dotenv from 'dotenv';
import {server} from './config';

dotenv.config();

const port = process.env.PORT || '3000';
server.listen(port, () => {
	console.log(`listening on port ${port}.`);
});
