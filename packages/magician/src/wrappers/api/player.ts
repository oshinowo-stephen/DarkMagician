import got from 'got'

export const PLAYER_ENDPOINT: string = process.env.API_EP_PLAYER === undefined
  ? 'http://localhost:5560/v1/players'
  : process.env.API_EP_PLAYER

export interface PlayerResponse {
  id: string
  bal: number
}

export class Player {

  public async fetch (id: string): Promise<PlayerResponse> {
    const reqUri = `${PLAYER_ENDPOINT}/${id}`

    const resp = await got(reqUri)

    return (JSON.parse(resp.body) as PlayerResponse)
  }

  public async create (id: string, init?: number): Promise<void> {
    const resp = await got.post(PLAYER_ENDPOINT, {
      json: {
        id,
        bal: init ?? 0,
      },
      responseType: 'json',
    })

    if (resp.statusCode !== 204) {
      throw new Error('cannot create player')
    }
  }

  public async update (id: string, bal: number): Promise<void> {
    const reqUri = `${PLAYER_ENDPOINT}/${id}`

    const resp = await got.patch(reqUri, {
      json: {
        bal,
      },
      responseType: 'json',
    })

    if (resp.statusCode !== 204) {
      throw new Error('unable to update player')
    }
  }

  public async delete (id: string): Promise<void> {
    const reqUri = `${PLAYER_ENDPOINT}/${id}`

    const resp = await got.delete(reqUri, {
      json: {
        id,
      },
      responseType: 'json',
    })

    if (resp.statusCode !== 204) {
      throw new Error('an error deleting player')
    }
  }

}
