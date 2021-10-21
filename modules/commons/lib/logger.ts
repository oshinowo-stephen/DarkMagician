import Transport from 'winston-transport'
import winston, { createLogger } from 'winston'

class CustomTransport extends Transport {
	constructor (opts: any) {
		super(opts)
	}

	log(info: any, callback: any) {
		setImmediate(() => this.emit('logged', info))

		callback()
	}
}

export const logger = createLogger({
	level: 'info',
	defaultMeta: {
		service: 'user-service'
	},
	transports: [
		new CustomTransport({}),
		new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
	]
})


