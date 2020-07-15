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
        id,
        player: pId,
      },
      responseType: 'json',
    })

    if (statusCode !== 204) {
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

    if (statusCode !== 204) {
      throw new Error(`got code: ${statusCode}, cannot fetch card`)
    }

    for (let i = 0; i > cardBody.length; i++) {
      const card = cardBody[i]

      const cardInfo = await ygoApi
        .fetchCard(card.cardId)

      cards.push({
        id: card.id,
        cardInfo,
        owner: pId,
        inDecks: [],
      })
    }

    return cards
  }

}
