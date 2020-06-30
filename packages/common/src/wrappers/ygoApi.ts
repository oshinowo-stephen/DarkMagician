import got from 'got'

import {
  isEmpty
} from '../utils'

const BASE_CARD_URL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?misc=Yes'
const BASE_RCARD_URL = 'https://db.ygoprodeck.com/api/v7/randomcard.php'

export const randomCard = async (): Promise<Card> => {
  try {
    const { body } = await got(BASE_RCARD_URL)

    const rawObject = JSON.parse(body).data

    if (isEmpty(rawObject)) {
      throw new Error('Invalid card')
    }

    return constructCard(rawObject)
  } catch (error) {
    throw error
  }
}

export const fetchCard = async (name: string): Promise<Card> => {
  try {
    const {
      body
    } = await got(`${BASE_CARD_URL}&name=${name}`)

    const rawObject = JSON.parse(body).data

    if (isEmpty(rawObject)) {
      throw new Error('Invalid Card')
    }

    const rawCardData = rawObject[0]

    return constructCard(rawCardData)
  } catch (error) {
    throw error
  }
}

export const searchCard = async (fuzz: string): Promise<Card[]> => {
  try {
    console.log(`${BASE_CARD_URL}&fname=${fuzz}`)

    const {
      body
    } = await got(`${BASE_CARD_URL}&fname=${fuzz}`)

    const cards: Card[] = []
    const rawObject = JSON.parse(body).data

    if (isEmpty(rawObject)) {
      throw new Error('Invalid Card')
    }

    for (let i = 0; i < rawObject.length; i++) {
      cards.push(constructCard(rawObject[i]))
    }

    return cards
  } catch (error) {
    throw error
  }
}

const constructCard = (rawCard: any): Card => ({
  id: rawCard.id,
  name: rawCard.name,
  desc: rawCard.desc,
  race: rawCard.race,
  cardStats: pullStats(rawCard),
  cardLimits: getLimits(rawCard),
  cardType: mapTypeToCard(rawCard.type),
  archType: rawCard.archetype ?? undefined,
  attribute: rawCard.attribute ?? undefined,
  image: rawCard['card_images'][0]['image_url'],
  allowedInDL: isInDuelLinks(rawCard['misc_info'][0].formats),
  rarity: mapRarityToCard(rawCard['card_sets'][0]['set_rarity']),
  price: mapPriceToCard(rawCard['card_prices'][0]['amazon_price']),
})

const getLimits = (rawCard: any): CardLimits | undefined => {
  if (rawCard['banlist_info'] !== undefined) {
    const TCGLimit = rawCard['banlist_info']['ban_tcg']
    const OCGLimit = rawCard['banlist_info']['ban_ocg']
    const GoatLimit = rawCard['banlist_info']['ban_goat']

    return {
      tcg: TCGLimit ?? undefined,
      ocg: OCGLimit ?? undefined,
      goat: GoatLimit ?? undefined
    }
  } else {
    return undefined
  }
}

const pullStats = (object: any): CardStats | undefined => {
  if (object.atk !== undefined) {
    return {
      atk: object.atk,
      def: object.def ?? undefined,
      lvl: object.level ?? undefined,
      linkVal: object.linkval ?? undefined
    }
  }

  return undefined
}

const mapRarityToCard = (rawRarity: string): CardRarity => {
  const getBaseRarityString = rawRarity.split(' ')[0]

  switch (getBaseRarityString) {
    case 'rare':
    case 'holofoil':
      return CardRarity.Rare
    case 'gold':
    case 'super':
    case 'ghost':
    case 'ultimate':
    case 'prismatic':
      return CardRarity.SuperRare
    case 'ultra':
    case 'secret':
    case 'parallel':
    case 'holographic':
      return CardRarity.UltraRare
    default:
      return CardRarity.Common
  }
}

const mapPriceToCard = (priceStr: string): number => {
  const price: number = parseInt(priceStr)

  if (!isNaN(price)) {
    return price * 100000
  }

  return 100000
}

const isInDuelLinks = (formats: string[]): boolean =>
  formats.indexOf('Duel Links') !== -1

const mapTypeToCard = (rawType: string): CardTypes => {
  switch (rawType.split(' ')[0].toLocaleLowerCase()) {
    case 'xyz':
      return CardTypes.Xyz
    case 'trap':
      return CardTypes.Trap
    case 'toon':
      return CardTypes.Toon
    case 'link':
      return CardTypes.Link
    case 'union':
      return CardTypes.Union
    case 'spell':
      return CardTypes.Spell
    case 'tuner':
      return CardTypes.Tuner
    case 'effect':
      return CardTypes.Effect
    case 'fusion':
      return CardTypes.Fusion
    case 'ritual':
      return CardTypes.Ritual
    case 'normal':
      return CardTypes.Normal
    case 'synchro':
      return CardTypes.Synchro
    case 'pendulum':
      return CardTypes.Pendulum
    default:
      throw new Error('Unhandled CardType')
  }
}

export enum CardTypes {
  Xyz = 'Xyz',
  Trap = 'Tap',
  Toon = 'Toon',
  Link = 'Link',
  Union = 'Union',
  Spell = 'Spell',
  Tuner = 'Tuner',
  Effect = 'Effect',
  Fusion = 'Fusion',
  Ritual = 'Ritual',
  Normal = 'Normal',
  Synchro = 'Synchro',
  Pendulum = 'Pendulum'
}

export enum CardRarity {
  Rare = 0.35,
  Common = 0.50,
  SuperRare = 0.10,
  UltraRare = 0.05
}

export interface Card {
  id: number
  name: string
  desc: string
  race: string
  image: string
  price: number
  archType?: string
  attribute?: string
  rarity: CardRarity
  cardType: CardTypes
  allowedInDL: boolean
  cardStats?: CardStats
  cardLimits?: CardLimits
}

export interface CardLimits {
  tcg?: string
  ocg?: string
  goat?: string
}

export interface CardStats {
  atk?: number
  lvl?: number
  def?: number
  linkVal?: number
}
