import Express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import pinoHttp from 'pino-http';

import {middlewareController} from './middlewares/controller';
import {routerController} from './routes/controller';
import {config, bytes} from './utils';

export const tempFileFolder = path.resolve(__dirname, 'temp');
export const upload = multer({
	storage: config.storage,
	limits: {
		fileSize: bytes(5),
	},
});

export const server = Express();

// Configuration
server.use(cors(config.cors));
server.use(Express.json());
server.use(Express.urlencoded({extended: true}));
server.use(pinoHttp(config.logHttp));

// Middlewares
server.use(middlewareController.initializeMiddlewares());

// Routes
server.use(routerController.initializeRoutes());
