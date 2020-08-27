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

export class CRUDMethods<E> {

  private readonly repository: Repository<E>

  constructor (entity: E) {
    const connection = getConnection()
    this.repository = connection.getRepository(
      entity as unknown as EntitySchema<E>,
    )
  }

  public async del (
    conditions: FindConditions<E>,
  ): Promise<void> {
    await this
      .repository
      .delete(conditions)
  }

  public async update (
    partial: DeepPartial<E>,
  ): Promise<void> {
    await this
      .repository
      .save(partial)
  }

  public async create (
    partial: DeepPartial<E>,
  ): Promise<void> {
    const entry = this
      .repository
      .create(partial)

    await this
      .repository
      .save(entry)
  }

  public async fetch (
    conditions: FindConditions<E>,
  ): Promise<E> {
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
