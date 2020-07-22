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

    for (const {
      id,
      cardId,
      player,
      decks: allDecks,
    } of cards) {
      const decks = await allDecks

      allCards.push({
        id,
        decks,
        cardId,
        player,
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

    for (const {
      id,
      name,
      cards,
      player,
    } of decks) {
      const allCards = await cards

      allDecks.push({
        id,
        name,
        player,
        cards: allCards,
      })
    }

    return allDecks
  },
}
