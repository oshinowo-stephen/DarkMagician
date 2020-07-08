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
  CRUDController
} from '../CRUDController'

import {
  Request,
  Response,
} from 'express'

@Controller('player')
export class Player implements CRUDController {

  @Get('')
  public readAll (
    req: Request,
    res: Response,
  ): Promise<typeof res> {}

  @Get(':id')
  public read (
    req: Request,
    res: Response,
  ): Promise<typeof res> {}

  @Post('')
  public create (
    req: Request,
    res: Response,
  ): Promise<typeof res> {}

  @Patch(':id')
  public update (
    req: Request,
    res: Response,
  ): Promise<typeof res> {}

  @Delete(':id')
  public del (
    req: Request,
    res: Response,
  ): Promise<typeof res> {}

}
