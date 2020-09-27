import {
  DeepPartial,
  getRepository,
  FindConditions,
} from 'typeorm'

import { Players } from '../entities/Player'
import {
  ServerError,
  NotFoundError,
} from '@darkmagician/commons'

export const insert = async (
  p: DeepPartial<Players>,
): Promise<void> => {
  const repo = getRepository(Players)
  const entity = repo.create(p)

  try {
    await repo.save(entity)
  } catch (error) {
    if (error instanceof Error) {
      throw new ServerError(`cannot insert player, reason: ${error.message}`)
    }
  }
}

export const fetch = async (
  cond: FindConditions<Players>,
): Promise<Players> => {
  const repo = getRepository(Players)

  const entity = await repo.findOne(cond)

  if (entity !== undefined) {
    return entity
  }

  throw new NotFoundError('cannot find player')
}

export const fetchAll = async (): Promise<Players[]> => {
  const repo = getRepository(Players)

  const entities = await repo.find()

  if (entities.length !== 0) {
    return entities
  }

  throw new NotFoundError('no players found.')
}
