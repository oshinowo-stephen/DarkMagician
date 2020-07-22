import test from 'ava'

import { config } from '../src'

const { getConfig } = config

test('common | load config', (t) => {
  const conf = getConfig()

  t.is(conf.database.type, 'postgres')
  t.is(conf.token, process.env.DARK_MAGICIAN_TOKEN)
})
