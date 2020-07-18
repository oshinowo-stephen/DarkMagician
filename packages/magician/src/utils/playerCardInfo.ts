import {
  Magician,
} from '../modules/magician'

export interface PlayerInfo {
  balance: number
  cardsOwned: string[]
  decksOwned: string[]
}

export const getPlayerInfo = async (
  bot: Magician,
  player: string,
): Promise<PlayerInfo> => {
  const cards: string[] = []
  const decks: string[] = []
  const { bal } = await bot.players.fetch(player)

  try {
    const pCards = await bot.cards.fetchAllFromPlayer(player)
    const cardIds = pCards.map(({ cardInfo }) => cardInfo.id.toString())

    cards.push(...cardIds)
  } catch (_) {
    // empty block...
  }

  try {
    const pDecks = await bot.decks.fetchAllFromPlayer(player)
    const deckIds = pDecks.map(({ id }) => id)

    decks.push(...deckIds)
  } catch (_) {
    // empty block...
  }

  return {
    balance: bal,
    decksOwned: decks,
    cardsOwned: cards,
  }
}
