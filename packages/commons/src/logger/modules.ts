import TransportStream from 'winston-transport'
import 'chalk'

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
    const msg = `${level.toUpperCase()} | ${this.formatMsg(message, timestamp)}`

    return process.stdout.write(msg)
  }

  private formatMsg (msg: string, time: string): string {
    return `[${time}] > ${msg}`
  }

}

export class FileLogger extends TransportStream {

}
