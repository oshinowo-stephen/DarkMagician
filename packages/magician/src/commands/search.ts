import { Magician } from '../modules/magician'

import {
  Command,
} from 'eris-boiler'

import {
  Embed,
} from 'eris'

import { ygoApi } from '@darkmagician/common'

import {
  PageBuilder,
} from 'eris-pages'

export default new Command<Magician>({
  name: 'search',
  description: 'Search\'s for a card',
  options: {
    deleteInvoking: true,
    deleteResponse: true,
    deleteResponseDelay: 5000,
    aliases: [ 'lookup', 's', 'card' ],
  },
  run: async (bot, { msg, params }) => {
    if (params.length === 0) {}

    const cards = await ygoApi.searchCard(
      params.join('+').toLowerCase(),
    )

    const pageData: Embed[] = []

    for (const card of cards) {
      pageData.push(
        bot.constructCardEmbed(card),
      )
    }

    const builder = new PageBuilder(bot, msg, {
      extendedButtons: true,
    })

    await builder
      .addPages(pageData)
      .construct()

    builder.start()

    return `***${params.join(' ')}*** found! card entries shown above!`
  },
})
