import test from 'ava'
import { join } from 'path'

import { getConfig } from '../src'

test('commons/config | valid config', (t) => {
  const conf = getConfig(join(__dirname, 'data', 'base.yml'))

  t.deepEqual(conf.server, {
    host: 'localhost',
    port: 5000,
  })
  t.deepEqual(conf.database, {
    port: 6060,
    type: 'postgres',
    host: 'localhost',
    password: 'testpass12',
    username: 'testuser',
    database: 'testdb',
    migrations: [
      'data/migrations',
    ],
    subscribers: [],
    entities: [
      'data/entities',
    ],
    synchronize: false,
    cli: {
      entitiesDir: 'data/entities',
      migrationsDir: 'data/entries',
    },
  })
})
