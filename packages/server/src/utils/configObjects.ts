import type {IncomingMessage, ServerResponse} from 'http';
import type {Options as PinoHttpOptions} from 'pino-http';
import type {CorsOptions} from 'cors';

import {pino} from 'pino';
import multer from 'multer';
import {randomUUID} from 'crypto';
import randomString from 'randomstring';

import {tempFileFolder} from '../config';
import {pinoInstance} from './logger';

const pinoHttpConfig: PinoHttpOptions = {
	logger: pinoInstance,
	genReqId: (req: IncomingMessage, res: ServerResponse) => {
		if (req.id) {
			return req.id;
		}

		const id = randomUUID();
		res.setHeader('X-Request-Id', id);

		return id;
	},
	serializers: {
		err: pino.stdSerializers.err,
		req: pino.stdSerializers.req,
		res: pino.stdSerializers.res,
	},
	wrapSerializers: true,
	useLevel: 'info',
};

const corsOptions: CorsOptions = {
	origin: '*',
	methods: ['GET', 'PUT', 'POST', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id'],
	maxAge: 5000,
	credentials: true,
	optionsSuccessStatus: 200,
};

const storage: multer.StorageEngine = multer.diskStorage({
	destination: (_req, _file, cb) => {
		cb(null, tempFileFolder);
	},
	filename: (_req, file, cb) => {
		const uniqueSuffix =
			Date.now() +
			'.' +
			randomString.generate({
				length: 9,
				charset: 'alphabetic',
			});

		cb(
			null,
			`fileId-${uniqueSuffix}.${
				file.originalname.split('.')[file.originalname.split('.').length - 1]
			}`
		);
	},
});

export const config = {
	storage: storage,
	cors: corsOptions,
	logHttp: pinoHttpConfig,
};
