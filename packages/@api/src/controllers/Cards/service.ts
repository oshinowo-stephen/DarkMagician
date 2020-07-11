import {
  Connection,
  getConnection,
} from 'typeorm'

import { v4 as uuid } from 'uuid'

import { Cards } from '../../entities/Cards'

import {
  fetch as fetchPlayer,
} from '../Players/service'

import {
  serverMiddleware,
} from '@darkmagician/common'

const {
  NotFoundError,
} = serverMiddleware

export const fetchAll = async (): Promise<Cards[]> => {
  const CONN: Connection = getConnection()

  const cardsRepo = CONN
    .getRepository(Cards)

  const cards = await cardsRepo.find()

  if (cards.length === 0) {
    throw new NotFoundError('card database is empty')
  }

  return cards
}

export const fetchAllFromPlayer = async (
  playerId: string,
): Promise<Cards[]> => {
  const CONN: Connection = getConnection()

  const cardsRepo = CONN
    .getRepository(Cards)

  const player = await fetchPlayer(playerId)

  const cards = await cardsRepo.find({ player })

  if (cards.length === 0) {
    throw new NotFoundError(`player: ${player.id}, doesn't own any cards`)
  }

  return cards
}

export const fetch = async (id: string): Promise<Cards> => {
  const CONN: Connection = getConnection()

  const cardsRepo = CONN.getRepository(Cards)

  const card = await cardsRepo.findOne({ id })

  if (card === undefined) {
    throw new NotFoundError(`cannot find card: ${id}, in database`)
  }

  return card
}

export const fetchByCard = async (
  cardId: number,
): Promise<Cards[]> => {
  const CONN: Connection = getConnection()

  const cardsRepo = CONN.getRepository(Cards)

  const cards = await cardsRepo.find({ cardId })

  if (cards.length === 0) {
    throw new Error(`no card ID: ${cardId}, in database found`)
  }

  return cards
}

export const create = async (
  id: number,
  playerId: string,
): Promise<void> => {
  const CONN: Connection = getConnection()

  const cardsRepo = CONN.getRepository(Cards)

  const player = await fetchPlayer(playerId)

  const newCard = cardsRepo.create({
    player,
    cardId: id,
    id: uuid().toString(),
  })

  await cardsRepo.save(newCard)
}

export const transferPlayer = async (
  cId: string,
  pId: string,
): Promise<void> => {
  const CONN: Connection = getConnection()

  const cardsRepo = CONN.getRepository(Cards)

  const player = await fetchPlayer(pId)
  const card = await fetch(cId)

  card.player = player

  await cardsRepo.update({
    id: cId,
  }, card)
}

// export const addToDeck = async (
// cId: number,
// dId: number,
// ): Promise<void> => {
// const cardsRepo = CONN.getRepository(Cards)
// }
