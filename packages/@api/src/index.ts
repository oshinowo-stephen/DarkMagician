import {
  //logger,
  config,
  DarkMagicianServer,
} from '@darkmagician/common'

import {
  RootController as Root,
} from './controllers'

const conf = config.getConfig()

const server = new DarkMagicianServer([
  new Root(),
])

server
  .start(conf.serverPort)
  .catch((error: Error) =>
    console.log(error))
