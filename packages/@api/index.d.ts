declare module '@darkmagician/api' {
 namespace DeleteCards$Deck {
   export interface $204 {
   }
   export type $400 = Responses.$400
   export type $404 = Responses.$404
   namespace Parameters {
     export type Decks = string
   }
   export interface PathParameters {
     decks: Parameters.Decks
   }
 }
 namespace DeleteCards$Id {
   export interface $204 {
   }
   export type $400 = Responses.$400
   export type $404 = Responses.$404
   namespace Parameters {
     export type Id = number
   }
   export interface PathParameters {
     id: Parameters.Id
   }
 }
 namespace DeleteCards$Player {
   export interface $204 {
   }
   export type $400 = Responses.$400
   export type $404 = Responses.$404
   namespace Parameters {
     export type Player = string
   }
   export interface PathParameters {
     player: Parameters.Player
   }
 }
 namespace DeleteDecks$Id {
   export interface $204 {
   }
   export type $400 = Responses.$400
   export type $404 = Responses.$404
   namespace Parameters {
     export type Id = string
   }
   export interface PathParameters {
     id: Parameters.Id
   }
 }
 namespace DeleteDecks$Player {
   export interface $204 {
   }
   export type $400 = Responses.$400
   export type $404 = Responses.$404
   namespace Parameters {
     export type Player = string
   }
   export interface PathParameters {
     player: Parameters.Player
   }
 }
 namespace DeletePlayers$Id {
   export interface $204 {
   }
   export type $400 = Responses.$400
   export type $404 = Responses.$404
   namespace Parameters {
     export type Id = string
   }
   export interface PathParameters {
     id: Parameters.Id
   }
 }
 namespace GetCards {
   export type $200 = Schemas.CardsView[]
 }
 namespace GetCards$Deck {
   export type $200 = Schemas.CardsView[]
   export type $404 = Responses.$404
   namespace Parameters {
     export type Decks = string
   }
   export interface PathParameters {
     decks: Parameters.Decks
   }
 }
 namespace GetCards$Id {
   export type $200 = Schemas.CardsView
   export type $404 = Responses.$404
   namespace Parameters {
     export type Id = number
   }
   export interface PathParameters {
     id: Parameters.Id
   }
 }
 namespace GetCards$Player {
   export type $200 = Schemas.CardsView[]
   export type $404 = Responses.$404
   namespace Parameters {
     export type Player = string
   }
   export interface PathParameters {
     player: Parameters.Player
   }
 }
 namespace GetDecks {
   export type $200 = Schemas.DecksView[]
   export type $404 = Responses.$404
 }
 namespace GetDecks$Id {
   export type $200 = Schemas.DecksView
   export type $404 = Responses.$404
   namespace Parameters {
     export type Id = string
   }
   export interface PathParameters {
     id: Parameters.Id
   }
 }
 namespace GetDecks$Player {
   export type $200 = Schemas.DecksView[]
   export type $404 = Responses.$404
   namespace Parameters {
     export type Player = string
   }
   export interface PathParameters {
     player: Parameters.Player
   }
 }
 namespace GetPlayers {
   export type $200 = Schemas.PlayerView[]
 }
 namespace GetPlayers$Id {
   export type $200 = Schemas.PlayerView
   export type $404 = Responses.$404
   namespace Parameters {
     export type Id = string
   }
   export interface PathParameters {
     id: Parameters.Id
   }
 }
 namespace PatchCards$Deck {
   export interface $204 {
   }
   export type $400 = Responses.$400
   export type $404 = Responses.$404
   namespace Parameters {
     export type Decks = string
   }
   export interface PathParameters {
     decks: Parameters.Decks
   }
   export type RequestBody = Schemas.CardsUpdate
 }
 namespace PatchCards$Id {
   export interface $204 {
   }
   export type $400 = Responses.$400
   export type $404 = Responses.$404
   namespace Parameters {
     export type Id = number
   }
   export interface PathParameters {
     id: Parameters.Id
   }
   export type RequestBody = Schemas.CardsUpdate
 }
 namespace PatchCards$Player {
   export interface $204 {
   }
   export type $400 = Responses.$400
   export type $404 = Responses.$404
   namespace Parameters {
     export type Player = string
   }
   export interface PathParameters {
     player: Parameters.Player
   }
   export type RequestBody = Schemas.CardsUpdate
 }
 namespace PatchDecks$Id {
   export interface $204 {
   }
   export type $400 = Responses.$400
   export type $404 = Responses.$404
   namespace Parameters {
     export type Id = string
   }
   export interface PathParameters {
     id: Parameters.Id
   }
   export type RequestBody = Schemas.DecksUpdate
 }
 namespace PatchDecks$Player {
   export interface $204 {
   }
   export type $400 = Responses.$400
   export type $404 = Responses.$404
   namespace Parameters {
     export type Player = string
   }
   export interface PathParameters {
     player: Parameters.Player
   }
   export type RequestBody = Schemas.DecksUpdate
 }
 namespace PatchPlayers$Id {
   export interface $204 {
   }
   export type $400 = Responses.$400
   export type $404 = Responses.$404
   namespace Parameters {
     export type Id = string
   }
   export interface PathParameters {
     id: Parameters.Id
   }
   export type RequestBody = Schemas.PlayerUpdate
 }
 namespace PostCards {
   export interface $204 {
   }
   export type $400 = Responses.$404
   export type RequestBody = Schemas.CardsPost
 }
 namespace PostDecks {
   export interface $204 {
   }
   export type $400 = Responses.$400
   export type RequestBody = Schemas.DecksPost
 }
 namespace PostPlayers {
   export interface $204 {
   }
   export type $400 = Responses.$400
   export type RequestBody = Schemas.PlayerPost
 }
 namespace Responses {
   export type $400 = Schemas.Error
   export type $404 = Schemas.Error
 }
 namespace Schemas {
   export interface CardsPartial {
     /**
      * Random generated string
      * example:
      * as2245sad15456
      */
     id?: string
     /**
      * Card ID fetched from the YGO API
      * example:
      * 7653536
      */
     cardId?: number
     decks?: any[]
     player?: PlayerPartial
   }
   export interface CardsPost {
     /**
      * Random generated string
      * example:
      * as2245sad15456
      */
     id?: string
     /**
      * Card ID fetched from the YGO API
      * example:
      * 7653536
      */
     cardId: number
     decks: any[]
     /**
      * Discord User ID
      * example:
      * 2005200
      */
     player: string
   }
   export interface CardsUpdate {
     /**
      * Random generated string
      * example:
      * as2245sad15456
      */
     id?: string
     /**
      * Card ID fetched from the YGO API
      * example:
      * 7653536
      */
     cardId?: number
     decks: any[]
     player: PlayerPartial
   }
   export interface CardsView {
     /**
      * Random generated string
      * example:
      * as2245sad15456
      */
     id: string
     /**
      * Card ID fetched from the YGO API
      * example:
      * 7653536
      */
     cardId: number
     decks: any[]
     player: PlayerPartial
   }
   export interface DecksPartial {
     /**
      * Deck's ID
      * example:
      * A57WQSXYsfsa
      */
     id?: string
     cards?: any[]
     /**
      * Deck name
      * example:
      * Cyber Angels
      */
     name?: string
     player?: PlayerPartial
   }
   export interface DecksPost {
     /**
      * Deck's ID
      * example:
      * A57WQSXYsfsa
      */
     id: string
     cards: any[]
     /**
      * Deck name
      * example:
      * Cyber Angels
      */
     name: string
     /**
      * Discord User ID
      * example:
      * 2005200
      */
     player: string
   }
   export interface DecksUpdate {
     /**
      * Deck's ID
      * example:
      * A57WQSXYsfsa
      */
     id?: string
     cards: any[]
     /**
      * Deck name
      * example:
      * Cyber Angels
      */
     name: string
     player: PlayerPartial
   }
   export interface DecksView {
     /**
      * Deck's ID
      * example:
      * A57WQSXYsfsa
      */
     id: string
     cards: any[]
     /**
      * Deck name
      * example:
      * Cyber Angels
      */
     name: string
     player: PlayerPartial
   }
   export interface Error {
     /**
      * Error status code
      * example:
      * 404
      */
     code: number
     /**
      * Error message
      * example:
      * Not Found
      */
     message: string
   }
   export interface PlayerPartial {
     /**
      * Player's Discord ID
      * example:
      * 229651386223034370
      */
     id?: string
     /**
      * Player's balance
      * example:
      * 506
      */
     bal?: number
   }
   export interface PlayerPost {
     /**
      * Player's Discord ID
      * example:
      * 229651386223034370
      */
     id: string
     /**
      * Player's balance
      * example:
      * 506
      */
     bal: number
   }
   export interface PlayerUpdate {
     /**
      * Player's Discord ID
      * example:
      * 229651386223034370
      */
     id?: string
     /**
      * Player's balance
      * example:
      * 506
      */
     bal: number
   }
   export interface PlayerView {
     /**
      * Player's Discord ID
      * example:
      * 229651386223034370
      */
     id: string
     /**
      * Player's balance
      * example:
      * 506
      */
     bal: number
   }
 }
}
