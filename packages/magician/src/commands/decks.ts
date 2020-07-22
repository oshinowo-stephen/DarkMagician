import { Command } from 'eris-boiler'
import { Magician } from '@modules/magician'

import { error as errorHandler } from '../utils/handlers'

export default new Command<Magician>({
  name: 'decks',
  description: 'List, create or delete your decks!',
  options: {
    subCommands: [
      new Command({
        name: 'create',
        description: 'Create a deck!',
        options: {
          aliases: [ 'new', 'add' ],
          parameters: [ 'name' ],
        },
        run: async (bot, { msg, params }) => {
          const name = params.length === 0
            ? `${msg.author.username}, Deck`
            : params.join(' ')

          await bot.decks.create(name, msg.author.id)

          return `Deck: ***${name}***, is now in your duel bag!`
        },
      }),
    ],
  },
  run: async (bot, { msg }) => {
    try {
      const decks = await bot.decks.fetchAllFromPlayer(msg.author.id)

      return decks.length > 10
        ? decks
          .map(({ name }) => name)
          .splice(0, 10)
          .join(', ')
        : decks
          .map(({ name }) => name)
          .join(', ')
    } catch (error) {
      if (error instanceof Error) {
        const errMsg: string = error
          .toString()
          .split(' ')
          .join(' ')
          .toLowerCase()

        switch (errMsg) {
          case 'httperror: response code 404 (not found)':
            return `<@${msg.author.id}>, no decks found!`
          default:
            return errorHandler(errMsg)
        }
      }
    }
  },
})
