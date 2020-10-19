import {
  Magician,
  failedConnection,
} from './modules/magician'

import { join } from 'path'
import { getConfig } from '@darkmagician/commons'

export const { token } = getConfig()

export const magician = new Magician(token ?? 'INVALID_TOKEN')

magician
  .addEvents(join(__dirname, 'events'))
  .addCommands(join(__dirname, 'commands'))
  .addPermissions(join(__dirname, 'permissions'))
  .connect().catch(failedConnection)
