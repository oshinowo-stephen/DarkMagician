import {
  logger,
  getConfig,
  CommonServer,
  loggerEndpoint,
  errorMiddleware,
} from '@darkmagician/commons'

import {
  Controller,
  ClassMiddleware,
  ChildControllers,
  ClassErrorMiddleware,
} from '@overnightjs/core'

import { PlayerController } from './controller'

const { server: { port } } = getConfig()

@Controller('')
@ClassMiddleware(loggerEndpoint)
@ClassErrorMiddleware(errorMiddleware)
@ChildControllers([ new PlayerController() ])
class RootController {}

const server = new CommonServer([
  new RootController(),
])

server.start(port)

logger.info(`starting [dmg-players] on port: ${port}`)
