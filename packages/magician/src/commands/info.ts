import {
  Command,
} from 'eris-boiler'

import {
  Magician,
} from '../modules/magician'

import { PlayerResponse } from '@wrappers/api/player'

export default new Command<Magician>({
  name: 'pinfo',
  options: {
    aliases: [ 'p', 'player' ],
  },
  description: 'Grab player info',
  run: async (bot, { msg, params }) => {
    const player = params[0] === undefined
      ? msg.author.id
      : params[0]

    const user = bot.users.get(player)

    const { bal }: PlayerResponse = await bot
      .players
      .fetch(player)

    return {
      embed: {
        title: `📜 ${user?.username.toUpperCase() ?? 'UNKNOWN'}`,
        thumbnail: {
          url: user?.avatarURL ?? '',
        },
        fields: [
          {
            inline: true,
            name: 'Balance 💵',
            value: `$${bal}`,
          },
        ],
        author: {
          name: `Called by ${msg.author.username}`,
          icon_url: msg.author.avatarURL,
        },
      },
    }
  },
})
