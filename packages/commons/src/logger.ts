import * as winston from 'winston'

export const logger: winston.Logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	transports: [
		new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
		process.env.NODE_ENV !== 'production'
			? new winston.transports.Console()
			: new winston.transports.File({ filename: 'logs/output.log' }),
	]
})
