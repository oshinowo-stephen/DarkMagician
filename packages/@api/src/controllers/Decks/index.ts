import {
  Get,
  Post,
  Patch,
  Delete,
  Controller,
  ClassWrapper,
} from '@overnightjs/core'

import {
  GetDecks,
  PostDecks,
  GetDecks$Id,
  GetDecks$Player,
  PatchDecks$Id,
  DeleteDecks$Id,
} from '@darkmagician/api'

import {
  CRUDController,
} from '../CRUDController'

import {
  Params,
} from '../../utils/params'

import {
  decks,
} from '../../utils/views'

import {
  Request,
  Response,
} from 'express'

import {
  serverMiddleware,
} from '@darkmagician/common'

import * as service from './service'

@Controller('decks')
@ClassWrapper(serverMiddleware.asyncWrap)
export class Decks implements CRUDController {

  @Get('')
  public async readAll (
    _req: Request<
      Params,
      GetDecks.$200
    >,
    res: Response<GetDecks.$200>,
  ): Promise<typeof res> {
    const allDecks = await service.fetchAll()

    const views = await decks.array(allDecks)

    return res
      .status(200)
      .json(views)
  }

   @Get(':id')
  public async read (
    req: Request<
  Params<GetDecks$Id.PathParameters>,
   GetDecks$Id.$200
   >,
    res: Response<GetDecks$Id.$200>,
  ): Promise<typeof res> {
    const { id } = req.params

    const deck = await service.fetch(id)
    const view = await decks.single(deck)

    return res
      .status(200)
      .json(view)
  }

  @Get('players/:player')
   public async readFromPlayer (
     req: Request<
      Params<GetDecks$Player.PathParameters>,
      GetDecks$Player.$200
    >,
     res: Response<GetDecks$Player.$200>,
   ): Promise<typeof res> {
     const { player } = req.params

     const playerDecks = await service.fetchAllByPlayer(player)

     const views = await decks.array(playerDecks)

     return res
       .status(200)
       .json(views)
   }

  @Post('')
  public async create (
    req: Request<
      Params,
      PostDecks.$204,
      PostDecks.RequestBody
    >,
    res: Response<PostDecks.$204>,
  ): Promise<typeof res> {
    const {
      name,
      player,
    } = req.body

    await service.create(player, name)

    return res.status(204).send()
  }

  @Patch(':id')
  public async update (
    req: Request<
      Params<PatchDecks$Id.PathParameters>,
      PatchDecks$Id.$204,
      PatchDecks$Id.RequestBody
    >,
    res: Response<PatchDecks$Id.$204>,
  ): Promise<typeof res> {
    const { id } = req.params
    const {
      name,
      cards,
    } = req.body

    await service.update(
      id,
      name,
      cards,
    )

    return res.status(204).send()
  }

  @Delete(':id')
  public async del (
    req: Request<
      Params<DeleteDecks$Id.PathParameters>,
      DeleteDecks$Id.$204
    >,
    res: Response<DeleteDecks$Id.$204>,
  ): Promise<typeof res> {
    const { id } = req.params

    await service.del(id)

    return res.status(204).send()
  }

}
