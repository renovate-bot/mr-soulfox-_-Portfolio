import path from 'path';
import {pino} from 'pino';
import randomstring from 'randomstring';

const appLogId = randomstring.generate({
	length: 5,
	charset: 'numeric',
	capitalization: 'lowercase',
});

const fileTransport = pino.transport({
	targets: [
		{
			level: 'info',
			target: 'pino/file',
			options: {
				destination: path.join(__dirname, '..', '..', 'log', `app-${appLogId}.log`),
			},
		},
		{
			level: 'trace',
			target: 'pino-pretty',
			options: {
				colorize: true,
			},
		},
	],
});

export const pinoInstance = pino({
	level: String(process.env.LOGGER_LEVEL) || 'info',
	formatters: {
		level: (label: string) => {
			return {level: label.toUpperCase()};
		},
		bindings: (bindings: pino.Bindings) => {
			return {
				pid: bindings.pid,
				host: bindings.hostname,
				node_version: process.version,
			};
		},
	},
	timestamp: pino.stdTimeFunctions.isoTime,
	fileTransport,
});
