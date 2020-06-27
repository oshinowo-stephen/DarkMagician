import test from 'ava'

import { CommonConfig } from '../src'

const { getConfig } = CommonConfig

test('common | load config', async (t) => {
  const conf = getConfig({ targetDatabase: 'TEST_DB' })

  t.is(conf.database.type, 'postgres')
  t.is(conf.token, process.env.DARK_MAGICIAN_TOKEN)
})
