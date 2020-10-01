import test from 'ava'
import { join } from 'path'

import { getConfig } from '../src'
import { ServiceInfo } from '../src/config'

test('commons/config | valid config', (t) => {
  const conf = getConfig(join(__dirname, 'data', 'base.yml'))
  const services = conf.services
    ? conf.services['test']
    : {}

  t.deepEqual(services, {
    port: 7000,
    protocol: 'tcp',
    host: '127.0.0.1',
  } as ServiceInfo)
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
    entities: [
      'data/entities',
    ],
    subscribers: [
      'data/subscribers',
    ],
    synchronize: false,
    cli: {
      entitiesDir: 'data/entities',
      migrationsDir: 'data/migrations',
    },
  })
})
