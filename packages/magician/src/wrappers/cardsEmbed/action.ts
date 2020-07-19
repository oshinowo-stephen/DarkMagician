import { Magician } from '@modules/magician'
import { ygoApi } from '@darkmagician/common'
import { logger } from 'eris-boiler/util'

export const purchaseCard = async (
  bot: Magician,
  player: string,
  card: ygoApi.Card,
): Promise<void> => {
  try {
    const {
      bal,
    } = await bot.players.fetch(player)

    console.log(bal)
    console.log(card)

    if (bal > card.price) {
      const newBal = bal - card.price

      await bot.players.update(player, newBal)

      await bot.cards.create(card.id.toString(), player)
    } else {
      throw new Error(`invalid balance`)
    }
  } catch (error) {
    logger.error(`An error creating card: ${error}`)

    throw error
  }
}

export const sellCard = async (
  bot: Magician,
  player: string,
  card: ygoApi.Card,
): Promise<void> => {
  const { bal } = await bot.players.fetch(player)
  const cards = await bot.cards.fetchAllFromPlayer(player)

  const ownedCards = cards.filter(({ cardInfo }) => cardInfo.id === card.id)

  if (ownedCards.length !== 0) {
    const sellCard = ownedCards[0]

    const { price } = sellCard.cardInfo

    const newBal = bal + price

    await bot.players.update(player, newBal)

    await bot.cards.deleteCardById(sellCard.id)
  } else {
    throw new Error(`invalid cards`)
  }
}
