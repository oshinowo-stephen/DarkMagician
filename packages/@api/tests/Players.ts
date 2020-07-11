import test from 'ava'

test('is working', (t) => {
  const exp = 'hello'

  t.is('HElLo'.toLowerCase(), exp)
})
