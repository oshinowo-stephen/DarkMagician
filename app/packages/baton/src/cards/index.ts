import { Request } from 'zeromq'
import { BatonRequest } from '..'

const { CARD_SOCKET_ADDR } = process.env

const socket = new Request()
socket.connect(CARD_SOCKET_ADDR)

export const get = async (requestBody: CardRequest) => {
  const request: BatonRequest<CardRequest> = {
    service: 'cards',
    requestBody
  }

  await socket.send(JSON.stringify(request))

  const [resp] = await socket.receive()
  console.log(resp)
}

export interface CardRequest {
  name: string,
  opts: CardOptions | undefined 
}

export interface CardOptions {
  atk: number | undefined
}

export interface IncomingCardInfo {

}