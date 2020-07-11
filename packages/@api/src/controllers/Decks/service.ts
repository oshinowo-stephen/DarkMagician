import {
  getConnection,
} from 'typeorm'

import {
  v4 as uuid,
} from 'uuid'

import {
  Decks,
} from '../../entities/Decks'

import {
  serverMiddleware,
} from '@darkmagician/common'

import {
  fetch as fetchPlayer,
} from '../Players/service'

const {
  NotFoundError,
} = serverMiddleware

export const fetchAll = async (): Promise<Decks[]> => {
  const connection = getConnection()

  const decksRepo = connection
    .getRepository(Decks)

  const decks = await decksRepo.find()

  if (decks.length === 0) {
    throw new NotFoundError('deck database is empty!')
  }

  return decks
}

export const fetchAllByPlayer = async (
  pId: string,
): Promise<Decks[]> => {
  const connection = getConnection()

  const deckRepos = connection
    .getRepository(Decks)

  const player = await fetchPlayer(pId)

  if (player !== undefined) {
    const decks = await deckRepos
      .find({ player })

    if (decks.length === 0) {
      throw new NotFoundError(`${pId}, has no decks`)
    }

    return decks
  }

  throw new NotFoundError(`player: ${pId}, not found`)
}

export const fetch = async (
  dId: string,
): Promise<Decks> => {
  const connection = getConnection()

  const decksRepo = connection
    .getRepository(Decks)

  const deck = await decksRepo.findOne({ id: dId })

  if (deck === undefined) {
    throw new NotFoundError(`deck: ${dId}, not found`)
  }

  return deck
}

export const create = async (
  pId: string,
  name?: string,
): Promise<void> => {
  const connection = getConnection()

  const decksRepo = connection
    .getRepository(Decks)

  const player = await fetchPlayer(pId)

  if (player !== undefined) {
    const newDeck = decksRepo.create({
      player,
      id: uuid(),
      name: name ?? 'Deck',
    })

    await decksRepo.save(newDeck)
  } else {
    throw new NotFoundError(`${pId}, doesn't exist`)
  }
}

export const update = async (
  dId: string,
  name: string,
): Promise<void> => {
  const connection = getConnection()

  const decksRepo = connection
    .getRepository(Decks)

  await decksRepo.update({ id: dId }, {
    name,
  })
}

export const del = async (
  dId: string,
): Promise<void> => {
  const connection = getConnection()

  const decksRepo = connection
    .getRepository(Decks)

  await decksRepo.delete({ id: dId })
}
