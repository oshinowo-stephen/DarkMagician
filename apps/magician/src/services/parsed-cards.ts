import fetch from 'node-fetch'

export interface ParsedPayload {
    card_data: ParsedCardData,
    card_sets: ParsedCardSets[],
    card_imgs: ParsedCardImages[],
    card_format: ParsedCardFormat
}

export interface ParsedCardSets {
    name: string,
    release: string,
    market_url: string,
}

export interface ParsedCardData {
    name: string
    desc: string
    race: string
    attribute: string
    card_type: string
    monster_info?: MonsterCardInfo 
}

export interface ParsedCardImages {
    image: string,
    image_small: string
}

export interface ParsedCardFormat {
    tcg_limit: number,
    ocg_limit: number,
    goat_limit: number,
    tcg_release: string,
    ocg_release: string
}

export interface MonsterCardInfo {
    atk: number,
    is_effect: boolean,
    def?: number
    lvl?: number
    lval?: number
    scale?: number
    markers?: string[]
}

const CARDS_API_ENDPOINT: string = "http://127.0.0.1:2552"

export const getCardInfo = async (name: string): Promise<ParsedPayload> => {
    const response = await fetch(`${CARDS_API_ENDPOINT}/?name=${name}`)

    const incomingCardInfo = await response.json() as ParsedPayload

    return incomingCardInfo
}
