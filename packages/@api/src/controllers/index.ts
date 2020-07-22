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

const controllers: any[] = [
  new CardController(),
  new DeckController(),
  new PlayerController(),
]

if (process.env.NODE_ENV !== 'production') {
  controllers.push(new DebugController())
}

@Controller('v1')
@ChildControllers(controllers)
@ClassMiddleware(serverMiddleware.endpointLogger)
@ClassErrorMiddleware(serverMiddleware.errorMiddleware)
export class RootController {}
