import * as zmq from 'zeromq'

export interface RequestBody {
  query: string
  weights: string[]
  action: 'fetch' | 'search'
}

export interface CardResponse {
  id: string
  name: string
  desc: string

}

export const fetch = async (
  card: string,
): Promise<CardResponse> => {
  const socket = new zmq.Request()

  let res = ''
  const req = constructRequest('fetch', card, [])

  await socket.send(JSON.stringify(req))

  for await (const [ msg ] of socket) {
    res += msg.toString()
  }

  return JSON.parse(res) as CardResponse
}

const constructRequest = (
  action: 'fetch' | 'search',
  query: string,
  weights?: string[],
): RequestBody => ({
  query,
  action,
  weights: weights !== undefined
    ? weights
    : [],
})
