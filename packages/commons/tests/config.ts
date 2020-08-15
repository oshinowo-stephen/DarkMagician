import test from 'ava'
import { join } from 'path'

import { getConfig } from '../src'

test('commons/config | valid config', async (t) => {
  const conf = await getConfig(join(__dirname, 'data', 'base.yml'))

  t.deepEqual(conf.server, {
    host: 'localhost',
    port: 5000,
  })
  t.deepEqual(conf.database, {
    port: 6060,
    type: 'postgres',
    host: 'localhost',
    password: 'somepass',
    username: 'someuser',
    database: 'somename',
    migrations: [
      'path/to/migrations',
    ],
    subscribers: [
      'path/to/sub',
    ],
    entities: [
      'path/to/entity',
    ],
    synchronize: false,
    cli: {
      entitiesDir: 'entityDir',
      migrationsDir: 'migrationDir',
      subscribersDir: 'subscribersDir',
    },
  })
})
