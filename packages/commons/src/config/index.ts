import { readFileSync } from 'fs'
import { join } from 'path'
import yaml from 'yaml'

export interface ServerConfig {
  port: number
  host?: string
}

export interface Services {
  [service: string]: ServiceInfo
}

export interface ServiceInfo {
  port: number
  protocol: 'tcp' | 'udp'
  host: '127.0.0.1' | '*'
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

export interface ORMCLI {
  entitiesDir?: string
  migrationsDir?: string
  subscribersDir?: string
}

export interface Config {
  token?: string
  database: ORMConfig
  server: ServerConfig
  services?: Services
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
    services: config.services,
    token: config.token ?? undefined,
  }
}
