import {
  Server
} from '@overnightjs/core'

declare module '@darkmagician/common' {
  export namespace CommonConfig {
    function getConfig (config: ConfigOptions): Config
  }

  export namespace YgoWrapper {
    export function fetchCard (card: string): Promise<Card>
    export function randomCard (name: string): Promise<Card>
    export function searchCard (name: string): Promise<Card[]>
  }

  export class DarkMagicianServer extends Server {
    constructor (controllers: any[])

    start (port: number): Promise<void>
  }

  export enum CardTypes {
    Xyz,
    Trap,
    Toon,
    Link,
    Union,
    Spell,
    Tuner,
    Effect,
    Fusion,
    Ritual,
    Normal,
    Synchro,
    Pendulum
  }

  export enum CardRarity {
    Rare = 0.35,
    Common = 0.50,
    SuperRare = 0.10,
    UltraRare = 0.05
  }

  export interface Card {
    id: number
    name: string
    desc: string
    race: string
    image: string
    price: number
    archType?: string
    attribute?: string
    rarity: CardRarity
    cardType: CardTypes
    cardStats?: CardStats
  }

  export interface CardStats {
    atk?: number
    lvl?: number
    def?: number
    linkVal?: number
  }


  export interface Config {
    token: string
    server?: ServerConfig
    database: DatabaseConfig
  }

  export interface DatabaseConfig {
    type: string
    host: string
    port: number
    username: string
    password: string
    entities: string[]
    migrations: string[]
    cli: CLIOptions,
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
}
