declare module '@darkmagician/api' {
 namespace DeleteCards$Id {
   export interface $204 {
   }
   export type $404 = Responses.$404
   namespace Parameters {
     export type Id = string
   }
   export interface PathParameters {
     id: Parameters.Id
   }
 }
 namespace DeleteDecks$Id {
   export interface $204 {
   }
   export type $404 = Responses.$404
   namespace Parameters {
     export type Id = string
   }
   export interface PathParameters {
     id: Parameters.Id
   }
 }
 namespace DeletePlayers$Id {
   export interface $204 {
   }
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
 namespace GetCards$Id {
   export type $200 = Schemas.DecksView
   export type $404 = Responses.$404
   namespace Parameters {
     export type Id = string
   }
   export interface PathParameters {
     id: Parameters.Id
   }
 }
 namespace GetCards$Player {
   export type $200 = Schemas.CardsView[]
   namespace Parameters {
     export type Player = string
   }
   export interface PathParameters {
     player: Parameters.Player
   }
   export type RequestBody = Schemas.CardsPartial
 }
 namespace GetDecks {
   export type $200 = Schemas.DecksView[]
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
 namespace PatchCards$Id {
   export interface $204 {
   }
   export type $404 = Responses.$404
   namespace Parameters {
     export type Id = string
   }
   export interface PathParameters {
     id: Parameters.Id
   }
   export type RequestBody = Schemas.CardsUpdate
 }
 namespace PatchDecks$Id {
   export interface $204 {
   }
   export type $404 = Responses.$404
   namespace Parameters {
     export type Id = string
   }
   export interface PathParameters {
     id: Parameters.Id
   }
   export type RequestBody = Schemas.DecksUpdate
 }
 namespace PatchPlayers$Id {
   export interface $204 {
   }
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
   export type RequestBody = Schemas.CardsPost
 }
 namespace PostDecks {
   export interface $204 {
   }
   export type RequestBody = Schemas.DecksPost
 }
 namespace PostPlayers {
   export interface $204 {
   }
   export type RequestBody = Schemas.PlayerPost
 }
 namespace Responses {
   export type $400 = Schemas.Error
   export type $404 = Schemas.Error
 }
 namespace Schemas {
   export interface CardsPartial {
     /**
      * example:
      * 73580471
      */
     id?: number
     player?: PlayerPartial
   }
   export interface CardsPost {
     /**
      * example:
      * 73580471
      */
     id: number
     player: PlayerPartial
   }
   export interface CardsUpdate {
     /**
      * example:
      * 73580471
      */
     id?: number
     player?: PlayerPartial
     /**
      * example:
      * Pure Cyber Angel
      */
     name?: string
   }
   export interface CardsView {
     /**
      * example:
      * 73580471
      */
     id: number
     player: PlayerPartial
     decks: DecksView[]
   }
   export interface DecksPartial {
     /**
      * example:
      * Pure Cyber Angel
      */
     name?: string
     player?: PlayerPartial
   }
   export interface DecksPost {
     /**
      * example:
      * Pure Cyber Angel
      */
     name: string
     player: PlayerPartial
     /**
      * Deck's ID
      * example:
      * 47twmXb9HWzgbIIZ
      */
     id: string
   }
   export interface DecksUpdate {
     /**
      * example:
      * Pure Cyber Angel
      */
     name?: string
     player?: PlayerPartial
     /**
      * example:
      * 73580471
      */
     id?: number
   }
   export interface DecksView {
     /**
      * example:
      * Pure Cyber Angel
      */
     name: string
     player: PlayerPartial
     cards: CardsView[]
   }
   export interface Error {
     /**
      * example:
      * 404
      */
     code: number
     /**
      * example:
      * not found
      */
     message: string
   }
   export interface PlayerPartial {
     /**
      * Discord User ID
      * example:
      * 229651386223034370
      */
     id?: string
     /**
      * Player's current currency
      * example:
      * 2250
      */
     currency?: number
   }
   export interface PlayerPost {
     /**
      * Discord User ID
      * example:
      * 229651386223034370
      */
     id: string
     /**
      * Player's current currency
      * example:
      * 2250
      */
     currency: number
   }
   export interface PlayerUpdate {
     /**
      * Player's current currency
      * example:
      * 2250
      */
     currency?: number
   }
   export interface PlayerView {
     /**
      * Discord User ID
      * example:
      * 229651386223034370
      */
     id: string
     /**
      * Player's current currency
      * example:
      * 2250
      */
     currency: number
   }
 }
}
