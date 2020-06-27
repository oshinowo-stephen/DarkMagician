import got from 'got'

import {
  isEmpty
} from '../utils'

import {
  Card,
  CardStats,
  CardTypes,
  CardRarity,
} from '@darkmagician/common'

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
  cardType: mapTypeToCard(rawCard.type),
  archType: rawCard.archType ?? undefined,
  attribute: rawCard.attribute ?? undefined,
  image: rawCard['card_images'][0]['image_url'],
  rarity: mapRarityToCard(rawCard['card_sets'][0]['set_rarity']),
  price: mapPriceToCard(rawCard['card_prices'][0]['amazon_price']),
})

const pullStats = (object: any): CardStats | undefined => {
  if (object.atk !== undefined) {
    return {
      atk: object.atk,
      lvl: object.lvl ?? undefined,
      def: object.def ?? undefined,
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
