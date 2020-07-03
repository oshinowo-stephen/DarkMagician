import {
  Get,
  Post,
  Controller,
  ClassWrapper,
} from '@overnightjs/core'

import {
  logger,
  serverMiddleware,
} from '@darkmagician/common'

import {
  CRUDController,
} from '../CRUDController'

import {
  Request,
  Response,
} from 'express'

import {
  getConnection,
} from 'typeorm'

import {
  fetch as fetchPlayer,
  create as createPlayer,
} from './service'

@Controller('player')
@ClassWrapper(serverMiddleware.asyncWrap)
export class PlayerController implements CRUDController {

  @Get(':id')
  public async fetch (
    req: Request,
    res: Response,
  ): Promise<typeof res> {
    logger.debug(req)

    const player = await fetchPlayer(
      getConnection(),
      'testing-player',
    )

    logger.debug(player)

    return res
      .status(200)
      .send('Hell, World!')
  }

  @Post('')
  public async store (
    req: Request,
    res: Response,
  ): Promise<typeof res> {
    logger.debug(req)

    await createPlayer(
      getConnection(),
      'testing-player',
      0,
    )

    return res
      .status(200)
      .send('okay')
  }

}
