import { Magician } from '../modules/magician'

import {
  Command,
} from 'eris-boiler'

import {
  Embed,
  Message,
} from 'eris'

import { ygoApi } from '@darkmagician/common'

import {
  PageBuilder,
  ActionButton,
} from 'eris-pages'
import { logger } from 'eris-boiler/util'

export default new Command<Magician>({
  name: 'search',
  description: 'Search\'s for a card',
  options: {
    deleteInvoking: true,
    parameters: [ 'Card Name' ],
    aliases: [ 'lookup', 's', 'card' ],
  },
  run: async (bot, { msg, params }): Promise<void> => {
    await sendPageEmbed(bot, msg, params.join('+'))
  },
})

const sendPageEmbed = async (
  bot: Magician,
  msg: Message,
  card: string,
): Promise<string | Embed | void> => {
  try {
    const cards = await ygoApi.searchCard(card)
    const pageData: Embed[] = []

    for (const card of cards) {
      pageData.push(
        bot.constructCardEmbed(bot, msg.author.id, card),
      )
    }

    const builder = new PageBuilder<Magician>(bot, msg, {
      extendedButtons: true,
    })

    const actions: ActionButton<Magician>[] = [
      {
        emote: '💰',
        run: async (
          _msg: Message,
          bot: Magician,
          caller: string,
        ): Promise<void> => {
          const {
            price,
            id: cardId,
          } = cards[builder.currentPage]

          try {
            const player = await bot.players.fetch(caller)

            if (player !== undefined) {
              if (player.bal > price) {
                const newBal = player.bal - price

                await bot.players.update(caller, newBal)

                const id = cardId.toString()
                await bot.cards.create(id, caller)
              } else {
                _msg.channel
                  .createMessage(`<@${caller}>, inefficient balance, card price: ${price}`)
                  .catch((error: string) => logger.error(error))
              }
            }
          } catch (error) {
            const notFoundMsg = `
<@${caller}>, you need to run, command: \`start\` before collecting cards!`

            _msg.channel.createMessage(notFoundMsg)
              .catch((error: string) => logger.error(error))
          }
        },
      },
    ]

    try {
      await builder
        .addActions(actions)
        .addPages(pageData)
        .construct()

      builder.start()
    } catch (error) {
      if (error instanceof Error) {
        logger.warn('cannot construct builder,', error)

        switch (error.message) {
          case 'Must contain more at least 2 pages':
            logger.warn('only got one card')
        }

        return error.message
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.warn('cannot fetch card, ', error)

      switch (error.message) {
        case 'Response code 400 (Bad Request)':
          return `***${card}*** not found...`
      }

      return error.message
    }
  }
}
