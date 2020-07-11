import test from 'ava'

import { ygoApi } from '../src'

test('fetch card by name', async (t) => {
  const cardName = 'Black Rose Dragon'

  const card = await ygoApi.fetchCard(cardName)

  t.is(card.name, cardName)
})

test('search cards by fuzzy', async (t) => {
  const expecting = 'Number 39: Utopia'

  const cards = await ygoApi.searchCard('number 39')

  t.is(cards[0].name, expecting)
})
