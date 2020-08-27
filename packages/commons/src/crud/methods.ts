import {
  Repository,
  DeepPartial,
  EntitySchema,
  getConnection,
  FindConditions,
} from 'typeorm'

import {
  NotFoundError,
} from './middleware'

interface QueryParams<T> {
  partial: DeepPartial<T>
  conditions: FindConditions<T>
}

export class CRUDMethods<E> {

  private readonly repository: Repository<E>

  constructor (entity: E) {
    const connection = getConnection()
    this.repository = connection.getRepository(
      entity as unknown as EntitySchema<E>,
    )
  }

  public async updateOrDelete ({
    partial,
    conditions,
  }: QueryParams<E>): Promise<void> {
    if (partial !== undefined) {
      await this.repository.save(partial)
    } else if (conditions !== undefined) {
      await this.repository.delete(conditions)
    } else {
      throw new Error('invalid input')
    }
  }

  public async create ({
    partial,
  }: QueryParams<E>): Promise<void> {
    const entry = this
      .repository
      .create(partial)

    await this
      .repository
      .save(entry)
  }

  public async fetch ({
    conditions,
  }: QueryParams<E>): Promise<E> {
    const entry = await this
      .repository
      .findOne(conditions)

    if (entry !== undefined) {
      return entry
    }

    throw new NotFoundError('entry not found')
  }

  public async fetchAll (): Promise<E[]> {
    const entries = await this.repository.find()

    if (entries.length !== 0) {
      return entries
    }

    throw new NotFoundError('no entries found')
  }

}
