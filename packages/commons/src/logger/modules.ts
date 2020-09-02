import TransportStream from 'winston-transport'
import color from 'chalk'

type Callback = () => void

interface LoggerFormat {
  timestamp: string
  message: string
  level: string
}

export class ConsoleLogger extends TransportStream {

  public log (info: LoggerFormat, callback: Callback): void {
    setImmediate(() => this.emit('logged', info))

    this.logMessage(info)

    callback()
  }

  private logMessage ({
    level,
    message,
    timestamp,
  }: LoggerFormat) {
    let coloredLevel = ''

    switch (level.toLowerCase()) {
      case 'info':
        coloredLevel += color.cyan('INFO')
        break
      case 'warn':
        coloredLevel += color.yellow('WARN')
        break
      case 'error':
        coloredLevel += color.red('ERROR')
        break
      case 'debug':
        coloredLevel += color.magenta('DEBUG')
        break
      default:
        coloredLevel += 'TRACE'
    }

    const msg = `${coloredLevel} | ${this.formatMsg(message, timestamp)}`

    return process.stdout.write(`${msg}\n`)
  }

  private formatMsg (msg: string, time: string): string {
    return `[${time}] > ${msg}`
  }

}
