import { DataClient } from 'eris-boiler'

import {
  vip,
  admin,
  owner,
  createGeneric,
} from 'eris-boiler/permissions'

import { logger } from '@darkmagician/commons'

export class Magician extends DataClient {}

export const magicianVip = createGeneric<Magician>(vip)
export const magicianAdmin = createGeneric<Magician>(admin)
export const magicianOwner = createGeneric<Magician>(owner)

export const failedConnection = (error: Error): void => {
  logger.error('DMG failed to connect: ', error)
}
