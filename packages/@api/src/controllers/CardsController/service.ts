import {
  getConnection,
} from 'typeorm'

import {
  serverMiddleware,
} from '@darkmagician/common'

import {
  Cards,
} from '../../entities/Cards'
import {
  Player,
} from '../../entities/Player'
import {
  Decks,
} from '../../entities/Decks'

const {
  NotFoundError,
} = serverMiddleware

export const create = async (
  cardId: number,
  playerId: string,
): Promise<void> => {
  const conn = getConnection()

  const playerRepo = conn.getRepository(Player)
  const cardRepo = conn.getRepository(Cards)

  const player = await playerRepo.findOne({
    id: playerId,
  })

  if (player !== undefined) {
    const cards = cardRepo.create({
      player,
      id: cardId,
      decks: Promise.all([]),
    })

    await cardRepo.save(cards)
  }

  throw new NotFoundError(`player "${playerId}" not found`)
}

export const fetch = async (
  playerId: string,
): Promise<Cards[]> => {
  const conn = getConnection()

  const playerRepo = conn.getRepository(Player)
  const cardsRepo = conn.getRepository(Cards)

  const player = await playerRepo.findOne({ id: playerId })

  if (player !== undefined) {
    const cards = await cardsRepo.find({ player })

    if (cards.length > 0) {
      return cards
    } else {
      throw new NotFoundError(`no cards found for ${playerId}`)
    }
  } else {
    throw new NotFoundError(`player not found: ${playerId}`)
  }
}

export const update = async (
  playerId: string,
  cardId: number,
  decks: Decks,
): Promise<void> => {
  const conn = getConnection()

  const cardsRepo = conn.getRepository(Cards)
  const playerRepo = conn.getRepository(Player)

  const player = await playerRepo.findOne({
    id: playerId,
  })

  if (player !== undefined) {
    const cards = await cardsRepo.findOne({
      id: cardId,
      player,
    })

    if (cards !== undefined) {
      const cardDecks = await cards.decks
      cardDecks.push(decks)

      await cardsRepo.save(cards)
    } else {
      throw new NotFoundError(`no cards found with player: ${playerId}`)
    }
  } else {
    throw new NotFoundError(`player: ${playerId} not found`)
  }
}

export const del = async (
  playerId: string,
  cardId: number,
): Promise<void> => {
  const conn = getConnection()

  const playerRepo = conn.getRepository(Player)
  const cardsRepo = conn.getRepository(Cards)

  const player = await playerRepo.findOne({
    id: playerId,
  })

  if (player !== undefined) {
    await cardsRepo.delete({
      id: cardId,
      player,
    })
  } else {
    throw new NotFoundError(`player not found: ${playerId}`)
  }
}
