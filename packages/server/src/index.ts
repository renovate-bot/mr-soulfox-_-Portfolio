import type {CorsOptions} from 'cors';
import dotenv from 'dotenv';
import Express from 'express';
import cors from 'cors';
import {middlewareController} from './middlewares/controller';
import {routerController} from './routes/controller';

dotenv.config();

const server = Express();
const port = process.env.PORT || '3000';
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

export const serverInstance = server.listen(port, () => {
	console.log(`listening on port ${port}.`);
});
