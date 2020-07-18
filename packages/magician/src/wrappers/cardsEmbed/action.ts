import { ActionButton } from 'eris-pages'
import { Magician } from '@modules/magician'
import { ygoApi } from '@darkmagician/common'
import { logger } from 'eris-boiler/util'
import { Message } from 'eris'

export const generate = (
  card: ygoApi.Card,
): ActionButton<Magician>[] => [
  {
    emote: '💸',
    run: async (
      msg,
      bot,
      caller,
    ): Promise<void> => {
      const p = await bot.players.fetch(caller)

      if (p.bal > card.price) {
        const newBal = p.bal - card.price

        await bot.players.update(caller, newBal)

        await bot.cards.create(card.id.toString(), caller)

        msg.channel.createMessage(purchaseMsg(caller, card.name))
          .then((msg) => deleteAfter(5000, msg))
          .catch((error: string) => logger.error(error))
      }
    },
  },
  {
    emote: '💰',
    run: async (
      _msg,
      bot,
      caller,
    ): Promise<void> => {
      const cards = await bot.cards.fetchAllFromPlayer(caller)
      const targetCards = cards
        .filter(({ cardInfo }) => cardInfo.id === card.id)

      if (targetCards.length !== 0) {
        const cardToRemove = targetCards[0]

        console.log(cardToRemove)
      }
    },
  },
]

const purchaseMsg = (
  player: string,
  cardName: string,
): string => `<@${player}>, card ***${cardName}***, is now in your binder!`

const deleteAfter = (
  time: number,
  msg: Message,
): void => {
  setTimeout(() => {
    msg.delete()
      .catch((error: string) => logger.error(error))
  }, time)
}
