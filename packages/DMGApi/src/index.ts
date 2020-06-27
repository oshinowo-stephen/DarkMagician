import {
  server,
  port
} from './controllers'

server.start(port).catch((error: string) => console.log(error))
