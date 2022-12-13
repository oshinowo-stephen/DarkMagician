import zmq from 'zeromq'

const { CARD_SOCKET_ADDR } = process.env

export const get = async (requestBody: CardRequest): Promise<IncomingCardInfo> => {
  return new Promise((res, rej) => {
    const socket = zmq.socket('req')
    socket.connect(CARD_SOCKET_ADDR)

    socket.send(JSON.stringify(requestBody), 0, (sock_err) => {
      if (sock_err) rej(sock_err)
    })

    socket.on('message', (payload) => {
      if (payload.toString() === '404 | Not Found') {
        rej('Invalid Card.')
      } else {
        res(
          JSON.parse(payload.toString()) as IncomingCardInfo
        )
      }
    })
  })
}

export interface CardRequest {
  card_name: string,
  opts: CardOptions | undefined 
}

export interface CardOptions {
  atk: number | undefined
}

export interface IncomingCardInfo {
  name: string
  desc: string
  race: string
  attribute: string
  archetype?: string
  card_type: string
  card_sets: IncomingCardSets[]
  card_imgs: IncomingCardImgs[]
}

export interface IncomingCardSets {}

export interface IncomingCardImgs {}

export interface IncomingCardFormat {}

export interface IncomingMonsterInfo {
  atk: number
  has_effect: boolean
  def: number
  lvl: number
  lval?: number
  scale?: number
  markers: string[]
}