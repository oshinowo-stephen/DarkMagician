import {
  Controller,
  ChildControllers,
  ClassErrorMiddleware,
} from  '@overnightjs/core'

import { CardController } from './CardController'
import { DeckController } from './DeckController'
import { PlayerController } from './PlayerController'

import {
  serverMiddleware
} from '@darkmagician/common'

@Controller('api')
@ChildControllers([
  new CardController(),
  new DeckController(),
  new PlayerController()
])
@ClassErrorMiddleware(serverMiddleware.errorMiddleware)
export class RootController {}
