import 'reflect-metadata'
import {
  CommonConfig,
  DarkMagicianServer
} from '@darkmagician/common'

const { getConfig } = CommonConfig
const config = getConfig({
  serverConfig: {
    port: 4550
  },
  targetDatabase: 'dmg_api'
})

import { RootController } from './@api'

export const server = new DarkMagicianServer([
  new RootController()
])

export const port = config.server !== undefined
  ? config.server.port
  : 7070
