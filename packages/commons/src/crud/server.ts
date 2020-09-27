import { Server } from '@overnightjs/core'
import { createConnection } from 'typeorm'
import {
  json,
  urlencoded,
} from 'body-parser'

import cors from 'cors'
import helmet from 'helmet'
import { log as logger } from '../logger'
import { getConfig } from '../config'

export class CommonServer extends Server {

  constructor (controllers: any[]) {
    super(process.env.NODE_ENV !== 'production')

    this.app.use(json())
    this.app.use(cors())
    this.app.use(helmet())
    this.app.use(urlencoded({}))

    super.addControllers(controllers)
  }

  public start (port: number): void {
    this.app.listen(port, () => {
      createConnection(getConfig().database)
        .then(() => logger.info('Database connection established'))
        .catch((e: string) => {
          logger.error(`Issue creating a database connection, reason: ${e}`)
        })
    })
  }

}
