import {
  Command,
} from 'eris-boiler'

import {
  Magician,
} from '../modules/magician'

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

    const playerInfo = await bot
      .players
      .fetch(player)

    const playerBal: number = playerInfo.bal

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
            value: `$${playerBal}`,
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
