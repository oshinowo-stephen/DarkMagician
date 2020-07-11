import {
  Schemas,
} from '@darkmagician/api'

import {
  Cards,
} from '../entities/Cards'
import {
  Player,
} from '../entities/Player'
import {
  Decks,
} from '../entities/Decks'

export const player = {
  single: (
    player: Player,
  ): Schemas.PlayerView => ({
    id: player.id,
    bal: player.bal,
  }),
  array: (
    players: Player[],
  ): Schemas.PlayerView[] => {
    const views: Schemas.PlayerView[] = []

    for (const { id, bal } of players) {
      views.push({ id, bal })
    }

    return views
  },
}

export const cards = {
  single: async (
    cards: Cards,
  ): Promise<Schemas.CardsView> => {
    const decks = await cards.decks

    return {
      decks,
      id: cards.id,
      cardId: cards.cardId,
      player: cards.player,
    }
  },
  array: async (
    cards: Cards[],
  ): Promise<Schemas.CardsView[]> => {
    const allCards: Schemas.CardsView[] = []

    for (const c of cards) {
      const decks = await c.decks

      allCards.push({
        decks,
        id: c.id,
        cardId: c.cardId,
        player: c.player,
      })
    }

    return allCards
  },
}

export const decks = {
  single: async (
    decks: Decks,
  ): Promise<Schemas.DecksView> => {
    const cards = await decks.cards

    return {
      cards,
      id: decks.id,
      name: decks.name,
      player: decks.player,
    }
  },
  array: async (
    decks: Decks[],
  ): Promise<Schemas.DecksView[]> => {
    const allDecks: Schemas.DecksView[] = []

    console.log(decks)

    for (const d of decks) {
      const cards = await d.cards

      allDecks.push({
        cards,
        id: d.id,
        name: d.name,
        player: d.player,
      })
    }

    return allDecks
  },
}
