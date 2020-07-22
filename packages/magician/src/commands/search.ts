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
        await bot.constructCardEmbed(bot, msg.author.id, card),
      )
    }

    const builder = new PageBuilder<Magician>(bot, msg, {
      extendedButtons: true,
    })

    try {
      await builder
        .addActions([
          {
            emote: '💸',
            run: async (): Promise<void> => {
              try {
                await bot.generateActions.purchaseCard(
                  bot,
                  msg.author.id,
                  cards[builder.currentPage - 1],
                )
              } catch (error) {
                if (error instanceof Error) {
                  switch (error.message) {
                    case 'invalid balance':
                      msg
                        .channel
                        .createMessage(
`<@${msg.author.id}>, ${cards[builder.currentPage - 1].name} is too high...`,
                        ).catch((error: string) => logger.error(error))
                      break
                  }
                }
              }
            },
          },
          {
            emote: '💰',
            run: async (): Promise<void> => {
              await bot.generateActions.sellCard(
                bot,
                msg.author.id,
                cards[builder.currentPage - 1],
              )
            },
          },
        ])
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
