import { readFileSync } from 'fs'
import { join } from 'path'
import yaml from 'yaml'

interface ServerConfig {
  port: number
  host?: string
}

export interface ORMConfig {
  cli: ORMCLI
  host: string
  port: number
  username: string
  password: string
  database: string
  entities: string[]
  migrations: string[]
  subscribers: string[]
  synchronize?: boolean
  type: 'postgres' | 'mysql' | 'sqlite'
}

interface ORMCLI {
  entitiesDir?: string
  migrationsDir?: string
  subscribersDir?: string
}

export interface Config {
  server: ServerConfig
  database: ORMConfig
}

export const getConfig = (path?: string): Config => {
  const p = path === undefined
    ? join(process.cwd(), 'config/default.yml')
    : path

  const contents = readFileSync(p, 'utf-8')
    .toString()

  const config = yaml.parse(contents.trim()) as Config

  return {
    server: {
      host: 'localhost',
      ...config.server,
    },
    database: {
      synchronize: false,
      ...config.database,
    },
  }
}
