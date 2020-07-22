import test from 'ava'

test.failing('get all cards', (t) => {
  const status = 500

  t.is(status, 200)
})

test.failing('create a new card', (t) => {
  const status = 500

  t.is(status, 204)
})

test.failing('fetch all cards from player', (t) => {
  const status = 500

  t.is(status, 204)
})
