declare module '@darkmagician/players' {
 namespace DeletePlayers$Id {
   export type $400 = Responses.$400
   export type $500 = Responses.$500
   namespace Parameters {
     export type Id = string
   }
   export interface PathParameters {
     id: Parameters.Id
   }
 }
 namespace GetPlayers {
   export type $200 = Schemas.PlayersView[]
   export type $404 = Responses.$404
   export type $500 = Responses.$500
 }
 namespace GetPlayers$Id {
   export type $200 = Schemas.PlayersView
   export type $404 = Responses.$404
   export type $500 = Responses.$500
   namespace Parameters {
     export type Id = string
   }
   export interface PathParameters {
     id: Parameters.Id
   }
 }
 namespace PatchPlayers$Id {
   export type $400 = Responses.$400
   export type $500 = Responses.$500
   namespace Parameters {
     export type Id = string
   }
   export interface PathParameters {
     id: Parameters.Id
   }
 }
 namespace PostPlayers {
   export type $400 = Responses.$400
   export type $500 = Responses.$500
   export type RequestBody = Schemas.PlayersPost
 }
 namespace Responses {
   export type $400 = Schemas.Error
   export type $404 = Schemas.Error
   export type $500 = Schemas.Error
 }
 namespace Schemas {
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
      * not found
      */
     message: string
   }
   export interface PlayersPartial {
     /**
      * Player's Discord ID
      * example:
      * 137217868436733950
      */
     id?: string
     /**
      * Player's Balance
      * example:
      * 5625
      */
     bal?: number
   }
   export interface PlayersPost {
     /**
      * Player's Discord ID
      * example:
      * 137217868436733950
      */
     id: string
     /**
      * Player's Balance
      * example:
      * 5625
      */
     bal?: number
   }
   export interface PlayersUpdate {
     /**
      * Player's Discord ID
      * example:
      * 137217868436733950
      */
     id?: string
     /**
      * Player's Balance
      * example:
      * 5625
      */
     bal: number
   }
   export interface PlayersView {
     /**
      * Player's Discord ID
      * example:
      * 137217868436733950
      */
     id: string
     /**
      * Player's Balance
      * example:
      * 5625
      */
     bal: number
   }
 }
}
