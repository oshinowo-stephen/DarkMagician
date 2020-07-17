import got from 'got'

const DECKS_ENDPOINT = process.env.DMG_DECK_ENDPOINT === undefined
  ? 'http://localhost:5560/v1/decks'
  : process.env.DMG_DECK_ENDPOINT

interface MockCard {
  id: string
}

interface MockDeck {
  id: string
  name: string
  cards: MockCard[]
}

export interface PlayerDeck {
  id: string
  name: string
  owner: string
  contents: string[]
}

export class Decks {

  public async create (
    name: string,
    pId: string,
  ): Promise<void> {
    const {
      statusCode,
    } = await got(DECKS_ENDPOINT, {
      json: {
        name,
        player: pId,
      },
      responseType: 'text',
    })

    if (statusCode !== 200) {
      throw new Error(`An error creating deck: ${statusCode}`)
    }
  }

  public async fetchAllFromPlayer (
    owner: string,
  ): Promise<PlayerDeck[]> {
    const {
      body,
      statusCode,
    } = await got(`${DECKS_ENDPOINT}/${owner}`)

    const decks: PlayerDeck[] = []
    const deckBody: MockDeck[] = JSON.parse(body) as MockDeck[]

    if (statusCode !== 200) {
      throw new Error(`An error fetching decks: ${statusCode}`)
    }

    for (let i = 0; i > deckBody.length; i++) {
      const {
        id,
        name,
        cards,
      } = deckBody[i]

      decks.push({
        id,
        name,
        owner,
        contents: cards
          .map(({ id }) => id),
      })
    }

    return decks
  }

}
