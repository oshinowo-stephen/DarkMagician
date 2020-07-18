import got from 'got'

import {
} from '@darkmagician/api'

import { ygoApi } from '@darkmagician/common'

const CARD_ENDPOINT: string = process.env.DMG_CARD_ENDPOINT === undefined
  ? 'http://localhost:5560/v1/cards'
  : process.env.DMG_CARD_ENDPOINT

interface MockCard {
  id: string
  cardId: string
  decks: MockDeck[]
}

interface MockDeck {
  id: string
  name: string
}

export interface PlayerCard {
  id: string
  owner: string
  inDecks: string[]
  cardInfo: ygoApi.Card
}

export class Cards {

  public async create (
    id: string,
    pId: string,
  ): Promise<void> {
    const {
      statusCode,
    } = await got.post(CARD_ENDPOINT, {
      json: {
        cardId: id,
        player: pId,
      },
      responseType: 'json',
    })

    if (statusCode !== 200) {
      throw new Error(`got code: ${statusCode}, card not created`)
    }
  }

  public async fetchAllFromPlayer (
    pId: string,
  ): Promise<PlayerCard[]> {
    const {
      body,
      statusCode,
    } = await got(`${CARD_ENDPOINT}/${pId}`)

    const cards: PlayerCard[] = []
    const cardBody: MockCard[] = JSON.parse(body) as MockCard[]

    if (statusCode !== 200) {
      throw new Error(`got code: ${statusCode}, cannot fetch card`)
    }

    for (const card of cardBody) {
      const {
        id,
        decks,
        cardId,
      } = card

      console.log('in loop')
      console.log(card)

      try {
        const cardInfo = await ygoApi.fetchCardById(cardId)

        cards.push({
          id,
          cardInfo,
          owner: pId,
          inDecks: decks.length !== 0
            ? decks.map(({ name }) => name)
            : [],
        })
      } catch (error) {
        console.log(error)
      }

      console.log(cards)
    }

    return cards
  }

}
