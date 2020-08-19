import {
  ParamsDictionary as ExpressParams,
} from 'express-serve-static-core'

import {
  Schemas as Players,
} from '@darkmagician/players'
import {
	Schemas as Cards,
} from '@darkmagician/cards'
import {
	Schemas as Decks,
} from '@darkmagician/decks'

type CardsViews = Cards.CardsView
type DecksViews = Decks.DecksView
type PlayerViews = Players.PlayersView

export type View = PlayerViews | CardsViews | DecksViews

export type Param<T = Record<string, unknown>> = ExpressParams & T

const isPlayView = (p: any): p is PlayerViews => {
  return (
    'id' in p && 'bal' in p
  )
}

export function exportViews<T> (views: T | T[]): View | View[] | undefined {
  if (Array.isArray(views) && views.length !== 0) {
    const newViews: View[] = []

    for (const view of views) {
      const v = exportView(view)

      if (v !== undefined) {
        newViews.push(v)
      }
    }

    return newViews.length !== 0
      ? newViews
      : undefined
  } else {
    return exportView(views)
  }
}

function exportView<T> (view: T): View | undefined {
  if (isPlayView(view)) {
    return view
  } else if (isCardView(view)) {

  } else if (isDeckView(view)) {

  }
}
