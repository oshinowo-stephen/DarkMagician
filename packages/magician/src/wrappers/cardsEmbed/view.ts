import {
  Embed,
  EmbedField,
} from 'eris'

import {
  Magician,
} from '../../modules/magician'

import {
  getPlayerInfo,
} from './playerCardInfo'

import {
  logger,
  ygoApi,
} from '@darkmagician/common'

export const construct = (
  bot: Magician,
  player: string,
  card: ygoApi.Card,
): Embed => ({
  type: 'rich',
  title: cardTitle(
    card.name,
    card.cardType,
    card.cardStats?.lvl,
  ),
  description: card.desc,
  thumbnail: {
    url: card.image,
  },
  fields: cardFields(bot, player, card),
  color: getCardColor(card.cardType.toString()),
})

const cardFields = (
  bot: Magician,
  player: string,
  card: ygoApi.Card,
): EmbedField[] | undefined => {
  const fields: EmbedField[] = []

  if (isMonsterCard(card.cardType)) {
    addMonsterStats(card, fields)
  }

  addBaseStats(fields, card, bot, player)
    .catch((error: string) => logger.warn(error))

  return fields.length === 0
    ? undefined
    : fields
}

const cardTitle = (
  name: string,
  cType: ygoApi.CardTypes,
  lvl?: number,
): string => {
  return cType === ygoApi.CardTypes.Spell ||
    cType === ygoApi.CardTypes.Skill ||
    cType === ygoApi.CardTypes.Token ||
    cType === ygoApi.CardTypes.Trap ||
    cType === ygoApi.CardTypes.Link
    ? name
    : cType === ygoApi.CardTypes.Xyz
      ? `Rank ${lvl ?? 0} | ${name}`
      : `Level ${lvl ?? 0} | ${name}`
}

const addBaseStats = async (
  fields: EmbedField[],
  card: ygoApi.Card,
  client: Magician,
  player: string,
): Promise<void> => {
  const {
    cardsOwned,
  } = await getPlayerInfo(client, player)

  fields.push({
    inline: true,
    name: 'PRICE / OWNED',
    value: `${card.price} / ${ownedAmount(card.name, cardsOwned)}`,
  })

  for (const format of card.formats) {
    fields.push({
      inline: true,
      name: 'FORMAT : LIMIT',
      value: `${format} : ${getLimit(format, card)}`,
    })
  }
}

const ownedAmount = (
  name: string,
  names: string[],
): number =>
  names
    .filter((value) => value === name)
    .length

const getLimit = (
  format: string,
  card: ygoApi.Card,
): string => {
  switch (format) {
    case 'tcg':
      return card.cardLimits !== undefined
        ? cardLimitToString(
          parseInt(card.cardLimits.tcg ?? '0'),
        )
        : 'Approved'
    case 'goat':
      return card.cardLimits !== undefined
        ? cardLimitToString(
          parseInt(card.cardLimits.goat ?? '0'),
        )
        : 'Approved'
    default:
      return card.cardLimits !== undefined
        ? cardLimitToString(
          parseInt(card.cardLimits.ocg ?? '0'),
        )
        : 'Approved'
  }
}

const cardLimitToString = (
  limit: number,
): string => {
  switch (limit) {
    case 1:
      return 'Semi-Limited'
    case 2:
      return 'Limited'
    case 3:
      return 'Banned'
    default:
      return 'Approved'
  }
}

const addMonsterStats = (
  card: ygoApi.Card,
  fields: EmbedField[],
): void => {
  if (card.cardStats !== undefined) {
    if (card.cardType === ygoApi.CardTypes.Link) {
      fields.push({
        inline: true,
        name: 'ATK / LINK',
        value: `${card.cardStats.atk ?? 0} / ${card.cardStats.linkVal ?? 0}`,
      })
    } else {
      fields.push({
        inline: true,
        name: 'ATK / DEF',
        value: `${card.cardStats.atk ?? 0} / ${card.cardStats.def ?? 0}`,
      })
    }

    const cType = card
      .cardType
      .toString()

    fields.push({
      inline: true,
      name: 'RACE / TYPE / ATTRIBUTE',
      value: `${card.race ?? ''} / ${cType} / ${card.attribute ?? ''}`,
    })
  }
}

const getCardColor = (type: string): number => {
  switch (type) {
    case 'Normal':
      return 0xffc482
    case 'Effect':
      return 0x9f5400
    case 'Ritual':
      return 0x0078b3
    case 'Synchro':
      return 0xf9f9f9
    case 'Xyz':
      return 0x1f1f1f
    case 'Fusion':
      return 0x3c005b
    case 'Link':
      return 0x00bae1
    case 'Trap':
      return 0x8a20ff
    case 'Spell':
      return 0x009169
    case 'Tuner':
      return 0x159100
    case 'Pendulum':
      return 0x00f096
    default:
      return 0x00000
  }
}

const isMonsterCard = (cardType: ygoApi.CardTypes): boolean => {
  return cardType !== ygoApi.CardTypes.Spell &&
    cardType !== ygoApi.CardTypes.Skill &&
    cardType !== ygoApi.CardTypes.Token &&
    cardType !== ygoApi.CardTypes.Trap
}
