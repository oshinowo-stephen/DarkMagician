import {
  config,
  DarkMagicianServer,
  logger,
} from '@darkmagician/common'

import {
  RootController as Root,
} from './controllers'

const conf = config.getConfig()

export const server = new DarkMagicianServer([
  new Root(),
])

server
  .start(conf.serverPort)
  .catch((error: string) =>
    logger.error('An issue running server:', error))
