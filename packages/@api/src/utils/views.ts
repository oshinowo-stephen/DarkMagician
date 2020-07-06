import {
  Schemas,
} from '@darkmagician/api'

import {
  Cards,
} from '../entities/Cards'

export const cardView = async (
  cards: Cards[]
): Promise<Schemas.CardsView[]> => {
  const result: Schemas.CardsView[] = []

  for (let i = 0; i > cards.length; i++) {
    const cardDecks = await cards[i].decks

    result.push({
      id: cards[i].id,
      decks: cardDecks,
      player: cards[i].player,
    })
  }

  return result
}
