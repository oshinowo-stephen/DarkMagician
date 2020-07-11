import {
  getConnection,
} from 'typeorm'

import {
  Player,
} from '../../entities/Player'

import {
  serverMiddleware,
} from '@darkmagician/common'

const {
  NotFoundError,
} = serverMiddleware

export const fetchAll = async (): Promise<Player[]> => {
  const connection = getConnection()

  const playerRepo = connection
    .getRepository(Player)

  const players = await playerRepo.find()

  if (players.length === 0) {
    throw new NotFoundError('player database is empty')
  }

  return players
}

export const fetch = async (id: string): Promise<Player> => {
  const connection = getConnection()

  const playerRepo = connection.getRepository(Player)

  const player = await playerRepo.findOne({ id })

  if (player === undefined) {
    throw new NotFoundError(`cannot find player: ${id}`)
  }

  return player
}

export const update = async (id: string, bal: number): Promise<void> => {
  const connection = getConnection()

  const playerRepo = connection
    .getRepository(Player)

  await playerRepo.save({ id, bal })
}

export const del = async (id: string): Promise<void> => {
  const connection = getConnection()

  const playerRepo = connection
    .getRepository(Player)

  await playerRepo.delete({ id })
}

export const create = async (id: string, bal?: number): Promise<void> => {
  const connection = getConnection()

  const playerRepo = connection
    .getRepository(Player)

  const player = playerRepo.create({
    id,
    bal: bal ?? 0,
  })

  await playerRepo.save(player)
}
