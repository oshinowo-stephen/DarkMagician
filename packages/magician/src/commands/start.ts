import {
  Command,
} from 'eris-boiler'

import {
  Magician,
} from '../modules/magician'

export default new Command<Magician>({
  name: 'start',
  description: 'start collecting cards!',
  run: async (bot, { msg }) => {
    await bot.players.create(msg.author.id)

    return 'CONGRATS, you\'re ready to start collecting cards!'
  },
})
