import {
  getConnection,
} from 'typeorm'

import {
  serverMiddleware,
} from '@darkmagician/common'

import {
  Player,
} from '../../entities/Player'

const {
  NotFoundError,
} = serverMiddleware

export const create = async (
  playerId: string,
  initCurr: number,
): Promise<void> => {
  const conn = getConnection()

  const playerRepo = conn
    .getRepository(Player)

  const player = playerRepo.create({
    id: playerId,
    currency: initCurr,
  })

  await playerRepo.save(player)
}

export const fetch = async (
  playerId: string,
): Promise<Player> => {
  const conn = getConnection()

  const playerRepo = conn
    .getRepository(Player)

  const player = await playerRepo
    .findOne({ id: playerId })

  if (player !== undefined) {
    return player
  }

  throw new NotFoundError(`${playerId} not found`)
}

export const update = async (
  currency: number,
  playerId: string,
): Promise<void> => {
  const conn = getConnection()

  const playerRepo = conn.getRepository(Player)

  const player = await playerRepo.findOne({
    id: playerId,
  })

  if (player !== undefined) {
    player.currency = currency

    await playerRepo.save(player)
  }

  throw new NotFoundError('player not found')
}

export const del = async (
  playerId: string,
): Promise<void> => {
  const conn = getConnection()

  const playerRepo = conn.getRepository(Player)

  await playerRepo.delete({ id: playerId })
}
