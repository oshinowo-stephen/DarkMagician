import {
  Controller,
  ClassMiddleware,
  ChildControllers,
  ClassErrorMiddleware,
} from '@overnightjs/core'

import { Cards as CardController } from './Cards'
import { Decks as DeckController } from './Decks'
import { Debug as DebugController } from './Debug'
import { Player as PlayerController } from './Players'

import {
  serverMiddleware,
} from '@darkmagician/common'

@Controller('v1')
@ChildControllers([
  new CardController(),
  new DeckController(),
  new DebugController(),
  new PlayerController(),
])
@ClassMiddleware(serverMiddleware.endpointLogger)
@ClassErrorMiddleware(serverMiddleware.errorMiddleware)
export class RootController {}
