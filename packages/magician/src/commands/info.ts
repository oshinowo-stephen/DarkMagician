import {
  Command,
} from 'eris-boiler'

import {
  Magician,
} from '../modules/magician'

export default new Command<Magician>({
  name: 'info',
  description: 'Grab player info',
  run: async (bot, { msg, params }) => {
    try {
      const playerInfo = await bot
        .players
        .fetch(
          params[0] === undefined
            ? msg.author.id
            : params[0],
        )

      return `current bal: ${playerInfo.bal}`
    } catch (error) {
      return 'you\'re not registered in my database...' +
        'try the command `start` to get started'
    }
  },
})
