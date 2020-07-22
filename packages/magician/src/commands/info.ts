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

    const decks = await bot
      .decks
      .fetchAllFromPlayer(msg.author.id)

    const playerBal: number = playerInfo.bal

    const deckNames = decks.length > 5
      ? decks.map(({ name }) => name)
        .slice(0, 5)
        .join(', ') + '...'
      : decks.map(({ name }) => name)
        .join('\n')

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
          {
            inline: true,
            name: 'Decks 🎴',
            value: `${deckNames}`,
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
