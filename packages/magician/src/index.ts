import { join } from 'path'

import { config } from '@darkmagician/common'

import { Magician } from './modules/magician'

const {
  token: TOKEN
} = config.getConfig({ targetDatabase: 'dmg_core' })

const magician = new Magician(TOKEN, {
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
