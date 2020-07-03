import {
  Connection,
} from 'typeorm'

import {
  Player,
} from '../../entities/Player'

export const create = async (
  conn: Connection,
  playerId: string,
  initCurr: number,
): Promise<void> => {
  const newPlayer = new Player()

  newPlayer.id = playerId
  newPlayer.currency = initCurr

  const playerRepo = conn
    .getRepository(Player)

  await playerRepo.save(newPlayer)
}

export const fetch = async (
  conn: Connection,
  playerId: string,
): Promise<Player> => {
  const playerRepo = conn
    .getRepository(Player)

  const player = await playerRepo
    .findOne({ id: playerId })

  if (player) {
    return player
  }

  throw new Error(`${playerId} not found`)
}
