import got from 'got'

const DECKS_ENDPOINT = process.env.DMG_DECK_ENDPOINT === undefined
  ? 'http://localhost:5560/v1/decks'
  : process.env.DMG_DECK_ENDPOINT

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

    if (statusCode !== 204) {
      throw new Error(`An error creating deck: ${statusCode}`)
    }
  }

}
