import test from 'ava'
import sinon from 'sinon'
import supertest from 'supertest'

const ENDPOINT: string = process.env.API_CARD_ENDPOINT === undefined
  ? 'http://localhost:5560/v1/cards'
  : process.env.API_CARD_ENDPOINT

test('is working', (t) => {
  const exp = 'hello'

  t.is('HElLo'.toLowerCase(), exp)
})
