import {
  Magician,
} from '../../modules/magician'

import {
  PlayerCard,
} from '../api/cards'

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
    const cardNames = pCards.map((card) => getCardName(card))

    cards.push(...cardNames)
  } catch (_) {
    // empty block...
  }

  try {
    const pDecks = await bot.decks.fetchAllFromPlayer(player)
    const deckNames = pDecks.map(({ name }) => name)

    decks.push(...deckNames)
  } catch (_) {
    // empty block...
  }

  return {
    balance: bal,
    decksOwned: decks,
    cardsOwned: cards,
  }
}

const getCardName = (
  { cardInfo }: PlayerCard,
): string => cardInfo.name
