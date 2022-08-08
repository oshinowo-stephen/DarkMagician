import { RequestInfo, RequestInit } from 'node-fetch'

const fetch = (url: RequestInfo, i?: RequestInit) =>
    import('node-fetch').then(({ default: fetch }) => fetch(url, i))

export interface PlayerInfo {
    id?: string
    bal: number
}

export interface PlayerCardInfo {
    holder?: string
    rarity?: string
    amount?: number
    name: string
}

const PLAYER_API_ENDPOINT: string = "http://127.0.0.1:2551"

export const getPlayer = async (id: string): Promise<PlayerInfo> => {
    const { json } = await fetch(`${PLAYER_API_ENDPOINT}/${id}`) 

    const body = await json()

    return body as PlayerInfo
} 

export const getPlayerCard = async (id: string, name: string): Promise<PlayerCardInfo> => {
    const { json } = await fetch(`${PLAYER_API_ENDPOINT}/${id}/cards/${name}`)

    const body = await json() as PlayerCardInfo
    
    body.amount === null
        ? body.amount = 0
        : body.amount = body.amount

    return body
}

export const getPlayerCards = async (id: string): Promise<PlayerCardInfo[]> => {
    const { json } = await fetch(`${PLAYER_API_ENDPOINT}/${id}/cards`)

    const body = await json() as PlayerCardInfo[]

    console.log(body)

    return body
}

export const storePlayerCard = async (i: PlayerCardInfo): Promise<void> => {
    try {
        await fetch(`${PLAYER_API_ENDPOINT}/${i.holder}/cards`, {
            method: 'POST',
            body: JSON.stringify(i),
        })
    } catch (error) {
        throw error
    }
}

export const storePlayer = async (i: PlayerInfo): Promise<void> => {
    try {
        await fetch(`${PLAYER_API_ENDPOINT}`, {
            method: 'POST',
            body: JSON.stringify(i),
        })
    } catch (error) {
        throw error
    }
}
