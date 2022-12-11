import { Request } from 'zeromq'

const { CARD_SOCKET_ADDR } = process.env

export const get = async (requestBody: CardRequest): Promise<IncomingCardInfo> => {
  const socket = new Request()
  socket.connect(CARD_SOCKET_ADDR)

  const request: CardRequest = requestBody

  await socket.send(JSON.stringify(request))

  const [resp] = await socket.receive()

  const data = JSON.parse(resp.toString())

  return data as IncomingCardInfo
}

export interface CardRequest {
  name: string,
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