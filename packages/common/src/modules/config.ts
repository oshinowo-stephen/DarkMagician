import {
  load as loadSecs,
} from 'docker-secret-env'

import {
  config as loadEnvs,
} from 'dotenv'

if (process.env.NODE_ENV === 'production') {
  loadSecs()
} else {
  loadEnvs({ path: '../../.env' })
}

export interface Config {
  token: string
  database: DatabaseConfig
  serverPort: number
}

export interface DatabaseConfig {
  type: string
  host: string
  port: number
  username: string
  password: string
  entities: string[]
  migrations: string[]
  synchronize: boolean
  cli: CLIOptions
  database: string
}

export interface CLIOptions {
  entitiesDir: string
  migrationsDir: string
}

export const getConfig = (): Config => ({
  token: process.env.DARK_MAGICIAN_TOKEN ?? 'INVALID_TOKEN',
  database: {
    port: 5432,
    type: 'postgres',
    host: 'localhost',
    entities: [
      'src/entities/*.ts',
    ],
    migrations: [
      'src/migrations/*.ts',
    ],
    synchronize: process.env.NODE_ENV !== 'production',
    cli: {
      entitiesDir: 'src/entities',
      migrationsDir: 'src/migrations',
    },
    username: process.env.NODE_ENV === 'production'
      ? process.env.ADMIN_DB_USER ?? 'INVALID_DB_USER'
      : process.env.DMG_DATABASE_USER ?? 'INVALID_DB_USER',
    password: process.env.NODE_ENV === 'production'
      ? process.env.ADMIN_DB_PASS ?? 'INVALID_DB_PASS'
      : process.env.DMG_DATABASE_PASS ?? 'INVALID_DB_PASS',
    database: process.env.DMG_DATABASE_NAME ?? 'INVALID_DB_NAME',
  },
  serverPort: process.env.NODE_ENV !== 'production'
    ? process.env.DMG_SERVER_PORT
      ? parseInt(process.env.DMG_SERVER_PORT)
      : parseInt('5560')
    : process.env.ADMIN_SERV_PORT
      ? parseInt(process.env.ADMIN_SERV_PORT)
      : parseInt('5560'),
})
