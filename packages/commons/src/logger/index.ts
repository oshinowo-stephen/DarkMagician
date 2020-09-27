import {
  format,
  createLogger,
} from 'winston'

import {
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
    new ConsoleLogger(),
  ],
})
