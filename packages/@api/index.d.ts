declare module '@darkmagician/api' {
 namespace Paths {
   namespace Cards {
     namespace GetCards {
       namespace Responses {
         export type $200 = Schemas.CardsView[]
       }
     }
     namespace PostCards {
       export type RequestBody = Schemas.CardsPost
       namespace Responses {
         export type $200 = Schemas.CardsView
       }
     }
   }
   namespace Cards$Player {
     namespace GetCards$Player {
       namespace Parameters {
         export type Player = string
       }
       export interface PathParameters {
         player: Parameters.Player
       }
       namespace Responses {
         export type $200 = Schemas.CardsView[]
       }
     }
   }
   namespace Decks {
     namespace GetDecks {
       namespace Responses {
         export type $200 = Schemas.DecksView[]
       }
     }
     namespace PostDecks {
       export type RequestBody = Schemas.DecksPost
       namespace Responses {
         export type $200 = Schemas.DecksView
       }
     }
   }
   namespace Decks$Player {
     namespace GetDecks$Player {
       namespace Parameters {
         export type Player = string
       }
       export interface PathParameters {
         player: Parameters.Player
       }
       namespace Responses {
         export type $200 = Schemas.DecksView[]
       }
     }
   }
   namespace Players {
     namespace GetPlayers {
       namespace Responses {
         export type $200 = Schemas.PlayerView[]
       }
     }
     namespace PostPlayers {
       export type RequestBody = Schemas.PlayerPost
       namespace Responses {
         export type $200 = Schemas.PlayerView
       }
     }
   }
   namespace Players$Id {
     namespace DeletePlayers$Id {
       namespace Parameters {
         export type Id = string
       }
       export interface PathParameters {
         id: Parameters.Id
       }
       namespace Responses {
         export interface $204 {
         }
         export type $404 = Responses.$404
       }
     }
     namespace GetPlayers$Id {
       namespace Parameters {
         export type Id = string
       }
       export interface PathParameters {
         id: Parameters.Id
       }
       namespace Responses {
         export type $200 = Schemas.PlayerView
         export type $404 = Responses.$404
       }
     }
     namespace PatchPlayers$Id {
       namespace Parameters {
         export type Id = string
       }
       export interface PathParameters {
         id: Parameters.Id
       }
       export type RequestBody = Schemas.PlayerUpdate
       namespace Responses {
         export type $200 = Schemas.PlayerView
         export type $404 = Responses.$404
       }
     }
   }
 }
 namespace Responses {
   export type $400 = Schemas.Error
   export type $404 = Schemas.Error
 }
 namespace Schemas {
   export interface CardsPartial {
     /**
      * example:
      * Card's API endpoint
      */
     endpoint?: string
     /**
      * Player's ID
      * example:
      * 229651386223034370
      */
     player?: string
   }
   export interface CardsPost {
     /**
      * example:
      * Card's API endpoint
      */
     endpoint?: string
     /**
      * Player's ID
      * example:
      * 229651386223034370
      */
     player?: string
     /**
      * example:
      * 73580471
      */
     id?: number
   }
   export interface CardsUpdate {
     /**
      * example:
      * Card's API endpoint
      */
     endpoint?: string
     /**
      * Player's ID
      * example:
      * 229651386223034370
      */
     player?: string
     /**
      * example:
      * Pure Cyber Angel
      */
     name?: string
   }
   export interface CardsView {
     /**
      * example:
      * Card's API endpoint
      */
     endpoint: string
     /**
      * Player's ID
      * example:
      * 229651386223034370
      */
     player?: string
     decks: DecksView
   }
   export interface DecksPartial {
     /**
      * example:
      * Pure Cyber Angel
      */
     name?: string
     /**
      * Player's ID
      * example:
      * 229651386223034370
      */
     player?: string
   }
   export interface DecksPost {
     /**
      * example:
      * Pure Cyber Angel
      */
     name?: string
     /**
      * Player's ID
      * example:
      * 229651386223034370
      */
     player?: string
     /**
      * example:
      * 47twmXb9HWzgbIIZ
      */
     id?: string
   }
   export interface DecksUpdate {
     /**
      * example:
      * Pure Cyber Angel
      */
     name?: string
     /**
      * Player's ID
      * example:
      * 229651386223034370
      */
     player?: string
     /**
      * example:
      * Card's API endpoint
      */
     endpoint?: string
   }
   export interface DecksView {
     /**
      * example:
      * Pure Cyber Angel
      */
     name: string
     /**
      * Player's ID
      * example:
      * 229651386223034370
      */
     player?: string
     cards: CardsView
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
     decks?: DecksPartial
     cards?: CardsPartial
   }
   export interface PlayerUpdate {
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
     decks?: DecksPartial
     cards?: CardsPartial
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
     decks: DecksView
     cards: CardsView
   }
 }
}
