import {
  logger,
  config,
  DarkMagicianServer,
} from '@darkmagician/common'

import {
  RootController as Root,
} from './controllers'

const { server: serverConfig } = config.getConfig({
  targetDatabase: 'dmgapi',
})

const server = new DarkMagicianServer([
  new Root(),
])

server
  .start(serverConfig?.port)
  .catch((error: string) =>
    logger.log('error', `issues running the server: ${error}`))
