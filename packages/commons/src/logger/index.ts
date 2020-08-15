import {
  format,
  // transports,
  createLogger,
} from 'winston'

import {
  // FileLogger,
  ConsoleLogger,
} from './modules'

const {
  NODE_ENV,
} = process.env

export const log = createLogger({
  level: NODE_ENV !== 'production'
    ? 'debug'
    : 'info',
  format: format.combine(
    format.timestamp(),
    format.prettyPrint(),
    format.splat(),
  ),
  transports: [
    // new FileLogger(),
    // new transports.Console(),
    new ConsoleLogger(),
  ],
})
