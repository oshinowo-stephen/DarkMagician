import Transport from 'winston-transport'

import {
  format,
  createLogger,
} from 'winston'

interface InfoProps {
  timestamp: string
  message: string
  level: string
}

class BetterLog extends Transport {

  public log (info: InfoProps, cb: () => void): void {
    const MESSAGE = info.message
    const LEVEL = info.level.toUpperCase()
    const TIMESTAMP = info.timestamp.split('.')

    // eslint-disable-next-line no-console
    console.log(`[${TIMESTAMP[0]}] (${LEVEL}) - ${MESSAGE}`)

    cb()
  }

}

export const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.simple(),
  ),
  transports: [
    new BetterLog(),
  ],
})
