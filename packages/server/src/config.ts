import type {CorsOptions} from 'cors';

import Express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import randomString from 'randomstring';

import {middlewareController} from './middlewares/controller';
import {routerController} from './routes/controller';

export const tempFileFolder = path.resolve(__dirname, 'temp');
const storage = multer.diskStorage({
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

export const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5, // 5MB
	},
});

export const server = Express();
const corsOptions: CorsOptions = {
	origin: '*',
	methods: ['GET', 'PUT', 'POST', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	maxAge: 5000,
	credentials: true,
	optionsSuccessStatus: 200,
};

// Configuration
server.use(cors(corsOptions));
server.use(Express.json());
server.use(Express.urlencoded({extended: true}));

// Middlewares
server.use(middlewareController.initializeMiddlewares());

// Routes
server.use(routerController.initializeRoutes());
