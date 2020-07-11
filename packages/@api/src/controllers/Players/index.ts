import {
  Get,
  Post,
  Patch,
  Delete,
  Controller,
  ClassWrapper,
} from '@overnightjs/core'

import {
  GetPlayers,
  PostPlayers,
  GetPlayers$Id,
  PatchPlayers$Id,
  DeletePlayers$Id,
} from '@darkmagician/api'

import {
  CRUDController,
} from '../CRUDController'

import {
  Request,
  Response,
} from 'express'

import {
  Params,
} from '../../utils/params'

import {
  player,
} from '../../utils/views'

import * as service from './service'

import { serverMiddleware } from '@darkmagician/common'

@Controller('players')
@ClassWrapper(serverMiddleware.asyncWrap)
export class Player implements CRUDController {

  @Get('')
  public async readAll (
    _req: Request<
      Params,
      GetPlayers.$200
    >,
    res: Response<GetPlayers.$200>,
  ): Promise<typeof res> {
    const players = await service.fetchAll()

    return res
      .status(200)
      .json(player.array(players))
  }

  @Get(':id')
  public async read (
    req: Request<
      Params<GetPlayers$Id.PathParameters>,
      GetPlayers$Id.$200
    >,
    res: Response<GetPlayers$Id.$200>,
  ): Promise<typeof res> {
    const { id } = req.params

    const p = await service.fetch(id)

    return res
      .status(200)
      .json(player.single(p))
  }

  @Post('')
  public async create (
    req: Request<
      Params,
      PostPlayers.$204,
      PostPlayers.RequestBody
    >,
    res: Response<PostPlayers.$204>,
  ): Promise<typeof res> {
    const {
      id,
      bal,
    } = req.body

    await service.create(id, bal)

    return res
      .status(204)
      .send()
  }

  @Patch(':id')
  public async update (
    req: Request<
      Params<PatchPlayers$Id.PathParameters>,
      PatchPlayers$Id.$204,
      PatchPlayers$Id.RequestBody
    >,
    res: Response<PatchPlayers$Id.$204>,
  ): Promise<typeof res> {
    const { id } = req.params
    const { bal } = req.body

    await service.update(id, bal)

    return res
      .status(204)
      .send()
  }

  @Delete(':id')
  public async del (
    req: Request<
      Params<DeletePlayers$Id.PathParameters>,
      DeletePlayers$Id.$204
    >,
    res: Response<DeletePlayers$Id.$204>,
  ): Promise<typeof res> {
    const { id } = req.params

    await service.del(id)

    return res
      .status(204)
      .send()
  }

}
