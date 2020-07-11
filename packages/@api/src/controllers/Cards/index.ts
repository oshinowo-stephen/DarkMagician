import {
  Get,
  Post,
  Patch,
  Delete,
  Controller,
  ClassWrapper,
} from '@overnightjs/core'

import {
  Request,
  Response,
} from 'express'

import {
  Params,
} from '../../utils/params'

import {
  GetCards,
  PostCards,
  // GetCards$Id,
  PatchCards$Id,
  DeleteCards$Id,
  // GetCards$Decks,
  // PatchCards$Decks,
  // DeleteCards$Decks,
  GetCards$Player,
  // PatchCards$Player,
  // DeleteCards$Player,
} from '@darkmagician/api'

import {
  cards as view,
} from '../../utils/views'

import {
  CRUDController,
} from '../CRUDController'

import * as service from './service'

import { serverMiddleware } from '@darkmagician/common'

@Controller('cards')
@ClassWrapper(serverMiddleware.asyncWrap)
export class Cards implements CRUDController {

  @Get('')
  public async readAll (
    _req: Request<
      Params,
      GetCards.$200
    >,
    res: Response<GetCards.$200>,
  ): Promise<typeof res> {
    const cards = await service.fetchAll()

    const views = await view.array(cards)

    return res
      .status(200)
      .json(views)
  }

  @Get(':player')
  public async read (
    req: Request<
      Params<GetCards$Player.PathParameters>,
      GetCards.$200
    >,
    res: Response<GetCards.$200>,
  ): Promise<typeof res> {
    const { player } = req.params

    const cards = await service
      .fetchAllFromPlayer(player)

    const views = await view.array(cards)

    return res
      .status(200)
      .json(views)
  }

  @Post('')
  public async create (
    req: Request<
      Params<PostCards.$204>,
      PostCards.$204,
      PostCards.RequestBody
    >,
    res: Response<PostCards.$204>,
  ): Promise<typeof res> {
    const {
      cardId,
      player,
    } = req.body

    await service.create(cardId, player)

    return res
      .status(200)
      .send()
  }

  @Patch(':id')
  public async update (
    _req: Request<
      Params<PatchCards$Id.PathParameters>,
      PatchCards$Id.$204
    >,
    res: Response<PatchCards$Id.$204>,
  ): Promise<typeof res> {
    await service.fetchAll()

    return res
      .status(204)
      .send()
  }

  @Delete(':id')
  public async del (
    _req: Request<
      Params<DeleteCards$Id.PathParameters>,
      DeleteCards$Id.$204
    >,
    res: Response<DeleteCards$Id.$204>,
  ): Promise<typeof res> {
    await service.fetchAll()

    return res
      .status(204)
      .send()
  }

}