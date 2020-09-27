import {
  Get,
  Post,
  Controller,
  ClassWrapper,
} from '@overnightjs/core'

import {
  Request,
  Response,
} from 'express'

import {
  logger,
  Params,
  asyncWrap,
} from '@darkmagician/commons'

import {
  GetPlayers,
  PostPlayers,
  GetPlayers$Id,
} from '@darkmagician/players'

import * as methods from './service'
import * as views from './service/views'

@Controller('')
@ClassWrapper(asyncWrap)
export class PlayerController {

  @Post('')
  public async create (
    req: Request<
      Params,
      Record<string, unknown>,
      PostPlayers.RequestBody
    >,
    res: Response,
  ): Promise<typeof res> {
    const {
      id,
      bal,
    } = req.body

    try {
      await methods.insert({
        id,
        bal,
      })
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Unexpected error occurred: ${error.message}`)
      }
    }

    return res.status(204).send()
  }

  @Get(':id')
  public async read (
    req: Request<
      Params,
      GetPlayers$Id.$200
    >,
    res: Response<GetPlayers$Id.$200>,
  ): Promise<typeof res> {
    try {
      const { id } = req.params

      const player = await methods.fetch({ id })

      return res
        .status(200)
        .json(views.show(player))
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Unexpected error occurred: ${error.message}`)
      }

      return res.status(500).send(undefined)
    }
  }

  @Get('')
  public async readAll (
    _req: Request<
      Params,
      GetPlayers.$200
    >,
    res: Response<GetPlayers.$200>,
  ): Promise<typeof res> {
    try {
      const players = await methods.fetchAll()

      return res
        .status(200)
        .json(views.showAll(players))
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`Unexpected error occurred: ${error.message}`)
      }

      return res.status(500).send(undefined)
    }
  }

}
