import Transport from 'winston-transport'
import chalk from 'chalk'

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
    const TIMESTAMP = info.timestamp.split('.')

    // eslint-disable-next-line no-console
    console.log(`[${TIMESTAMP[0]}] (${getLevelColor(info.level)}) - ${MESSAGE}`)

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

const getLevelColor = (
  level: string,
): string => {
  switch (level) {
    case 'info':
      return `${chalk.cyan('INFO')}`
    case 'warn':
      return `${chalk.yellow('WARN')}`
    case 'error':
      return `${chalk.red('ERROR')}`
    default:
      return `${chalk.magenta('TRACE')}`
  }
}
