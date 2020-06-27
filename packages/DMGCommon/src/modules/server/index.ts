import { Server } from '@overnightjs/core'
import { createConnection } from 'typeorm'

import cors from 'cors'
import helmet from 'helmet'

import * as parser from 'body-parser'

export class DarkMagicianServer extends Server {
  constructor (controllers: any[]) {
    super(process.env.NODE_ENV !== 'production')

    this.app.use(parser.urlencoded({ extended: true }))
    this.app.use(parser.json())
    this.app.use(helmet())
    this.app.use(cors())

    super.addControllers(controllers)
  }

  public async start (port: number): Promise<void> {
    await createConnection()

    this.app.listen(port, () => {
      console.log(`listening on port: ${port}`)
    })
  }
}
