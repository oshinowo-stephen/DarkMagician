import {
  Get,
  Post,
  Delete,
  Controller,
  ClassWrapper,
} from '@overnightjs/core'

import {
  PostCards,
  GetCards$Player,
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
} from './service'

@Controller('cards')
@ClassWrapper(serverMiddleware.asyncWrap)
export class CardsController implements CRUDController {}
