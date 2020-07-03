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

export const getConfig = ({
  serverConfig,
  targetDatabase,
}: ConfigOptions): Config => ({
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
    database: targetDatabase,
    cli: {
      entitiesDir: 'src/entities',
      migrations: 'src/migrations',
    },
    username: process.env.NODE_ENV === 'production'
      ? process.env.ADMIN_DB_USER ?? 'INVALID_DB_USER'
      : process.env.DMG_DATABASE_USER ?? 'INVALID_DB_USER',
    password: process.env.NODE_ENV === 'production'
      ? process.env.ADMIN_DB_PASS ?? 'INVALID_DB_PASS'
      : process.env.DMG_DATABASE_PASS ?? 'INVALID_DB_PASS',
  },
  server: serverConfig ?? undefined,
})

export interface Config {
  token: string
  database: DatabaseConfig
  server?: ServerConfig
}

export interface DatabaseConfig {
  type: string
  host: string
  port: number
  username: string
  password: string
  entities: string[]
  migrations: string[]
  cli: CLIOptions
  database: string
}

export interface CLIOptions {
  entitiesDir: string
  migrations: string
}

export interface ConfigOptions {
  targetDatabase: string
  serverConfig?: ServerConfig
}

export interface ServerConfig {
  port: number
}
