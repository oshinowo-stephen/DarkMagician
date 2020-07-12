import {
  ActionButton,
} from 'eris-pages'

import {
  ygoApi,
} from '@darkmagician/common'

export const cardActions = (
  _card: ygoApi.Card,
): ActionButton[] => [
  {
    emote: '💸',
    run: async (msg) => {},
  {
    emote: '💰',
    run: async (msg) => {}
  },
]
