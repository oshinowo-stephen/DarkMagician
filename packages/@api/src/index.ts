import {
  config,
  DarkMagicianServer,
  logger
} from '@darkmagician/common'

import {
  RootController
} from './controllers'

const { server: serverConfig } = config.getConfig({
  serverConfig: {
    port: 6054
  },
  targetDatabase: 'dmg_api'
})

const server = new DarkMagicianServer([
  new RootController()
])

server
  .start(serverConfig?.port)
  .catch((error) => logger.error(`issues running the server: ${error}`))
