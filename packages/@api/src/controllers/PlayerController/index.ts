import {
  Get,
  Post,
  Delete,
  Controller,
  ClassWrapper,
} from '@overnightjs/core'

import {
  PostPlayers,
  GetPlayers$Id,
  PatchPlayers$Id,
} from '@darkmagician/api'

import {
  Params,
} from '../../utils/params'

import {
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
  fetch as fetchPlayer,
  create as createPlayer,
  update as updatePlayer,
  del as deletePlayer,
} from './service'

@Controller('player')
@ClassWrapper(serverMiddleware.asyncWrap)
export class PlayerController implements CRUDController {

  @Get(':id')
  public async read (
    req: Request<
      Params<GetPlayers$Id.PathParameters>
    >,
    res: Response<GetPlayers$Id.$200>,
  ): Promise<typeof res> {
    const player = await fetchPlayer(req.params.id)

    return res
      .status(200)
      .send(player)
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
      currency,
    } = req.body

    await createPlayer(id, currency)

    return res
      .status(204)
      .send()
  }

  @Post(':id')
  public async update (
    req: Request<
      Params<PatchPlayers$Id.PathParameters>,
      PatchPlayers$Id.$204,
      PatchPlayers$Id.RequestBody
    >,
    res: Response<PatchPlayers$Id.$204>,
  ): Promise<typeof res> {
    const { currency } = req.body
    const { id } = req.params

    await updatePlayer(currency ?? 0, id)

    return res.status(204).send()
  }

  @Delete(':id')
  public async del (
    req: Request<
      Params<PatchPlayers$Id.PathParameters>,
      PatchPlayers$Id.$204,
      PatchPlayers$Id.RequestBody
    >,
    res: Response<PatchPlayers$Id.$204>,
  ): Promise<typeof res> {
    const { id } = req.params

    await deletePlayer(id)

    return res.status(204).send()
  }

}
