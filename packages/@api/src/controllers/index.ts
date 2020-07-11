import {
  Controller,
  ClassMiddleware,
  ChildControllers,
  ClassErrorMiddleware,
} from '@overnightjs/core'

import { Cards as CardController } from './Cards'
import { Decks as DeckController } from './Decks'
import { Player as PlayerController } from './Players'

import {
  serverMiddleware,
} from '@darkmagician/common'

@Controller('v1')
@ChildControllers([
  new CardController(),
  new DeckController(),
  new PlayerController(),
])
@ClassMiddleware(serverMiddleware.endpointLogger)
@ClassErrorMiddleware(serverMiddleware.errorMiddleware)
export class RootController {}
