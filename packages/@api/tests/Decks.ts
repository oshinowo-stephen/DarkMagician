import test from 'ava'

test.failing('fetch all decks', (t) => {
  const status = 500

  t.is(status, 200)
})
