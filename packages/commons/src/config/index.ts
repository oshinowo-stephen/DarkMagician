import fs from 'fs/promises'
import yaml from 'yaml'

interface ServerConfig {
  port: number
  host?: string
}

interface ORMConfig {
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
  entitiesDir: string
  migrationsDir: string
  subscribersDir: string
}

export interface Config {
  server: ServerConfig
  database: ORMConfig
}

export const getConfig = async (path: string): Promise<Config> => {
  const contents = (await fs.readFile(path, 'utf-8'))
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
