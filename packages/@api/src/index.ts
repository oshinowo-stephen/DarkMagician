import {
  logger,
  config,
  DarkMagicianServer,
} from '@darkmagician/common'

import {
  RootController,
} from './controllers'

const { server: serverConfig } = config.getConfig({
  targetDatabase: 'dmgapi',
})

const server = new DarkMagicianServer([
  new RootController(),
])

server
  .start(serverConfig?.port)
  .catch((error: string) =>
    logger.log('error', `issues running the server: ${error}`))
