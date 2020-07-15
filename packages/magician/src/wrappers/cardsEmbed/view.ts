import {
  Embed,
  EmbedField,
} from 'eris'

import {
  ygoApi,
} from '@darkmagician/common'

export const construct = (
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
  fields: cardFields(card),
  color: getCardColor(card.cardType.toString()),
})

const cardFields = (
  card: ygoApi.Card,
): EmbedField[] | undefined => {
  const fields: EmbedField[] = []

  if (isMonsterCard(card.cardType)) {
    addMonsterStats(card, fields)
  }

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
      ? `${name}`
    : cType === ygoApi.CardTypes.Xyz
      ? `Rank ${lvl ?? 0} | ${name}`
      : `Level ${lvl ?? 0} | ${name}`
}

const addBaseStats = (
  card: ygoApi.Card,
  fields: EmbedField[],
): void => {

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
