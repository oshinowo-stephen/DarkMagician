import {
  Schemas,
} from '@darkmagician/players'

import {
  NotFoundError,
} from '@darkmagician/commons'

export const showAll = (
  body: PlayerBody[],
): Schemas.PlayersView[] => {
  const views = []

  for (const { id, bal } of body) {
    views.push({
      id,
      bal,
    })
  }

  if (views.length === 0) {
    throw new NotFoundError('')
  }

  return views
}

export const show = (
  { id, bal }: PlayerBody,
): Schemas.PlayersView => ({
  id,
  bal,
})

export const error = (e: Error): string => {
  switch (e) {
    default:
      return e.message
  }
}

export interface PlayerBody {
  id: string
  bal: number
}
