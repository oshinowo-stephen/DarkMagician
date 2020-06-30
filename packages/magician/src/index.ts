import { join } from 'path'

import { CommonConfig } from '@darkmagician/common'

import { Magician } from './modules/magician'

const config = CommonConfig
  .getConfig({ targetDatabase: 'dmg_core' })

const magician = new Magician(config.token, {
  oratorOptions: {
    defaultPrefix: '?'
  },
  statusManagerOptions: {
    defaultStatus: {
      name: 'Yu-Gi-Oh! Duel Links',
      type: 0
    }
  }
})

magician
  .addEvents(join(__dirname, 'events'))
  .addCommands(join(__dirname, 'commands'))
  .connect()
