import {
  logger,
  config,
  DarkMagicianServer,
} from '@darkmagician/common'

import {
  RootController,
} from './controllers'

const { server: serverConfig } = config.getConfig({
  serverConfig: {
    port: 6054,
  },
  targetDatabase: 'dmg_api',
})

const server = new DarkMagicianServer([
  new RootController(),
])

logger.debug(config)

server
  .start(serverConfig?.port)
  .catch((error: string) =>
    logger.log('error', `issues running the server: ${error}`))
