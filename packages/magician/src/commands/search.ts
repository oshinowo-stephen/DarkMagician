import { Magician } from '../modules/magician'

import {
  Command,
} from 'eris-boiler'

import {
  Embed
} from 'eris'

import { ygoApi } from '@darkmagician/common'

import {
  PageBuilder
} from 'eris-pages'

export default new Command<Magician>({
  name: 'search',
  description: 'Search\'s for a card',
  options: {
    deleteInvoking: true,
    deleteResponse: true,
    deleteResponseDelay: 5000,
    aliases: ['lookup', 's', 'card']
  },
  run: async (bot, { msg, params }) => {
    if (params.length === 0) {}

    const cards = await ygoApi.searchCard(
      params.join('+').toLowerCase()
    )

    const pageData: Embed[] = []

    for (let i = 0; i < cards.length; i++) {
      pageData[i] = constructCard(cards[i])
    }

    const builder = new PageBuilder(bot, msg, {
      extendedButtons: true
    })

    await builder
      .addPages(pageData)
      .construct()

    builder.start()

    return `***${params.join(' ')}*** found! card entries shown above!`
  }
})

const constructCard = (card: ygoApi.Card): Embed => ({
  title: card.cardType === ygoApi.CardTypes.Spell ||
    card.cardType === ygoApi.CardTypes.Trap ||
    card.cardType === ygoApi.CardTypes.Link
  ? `${card.name}`
  : card.cardType === ygoApi.CardTypes.Xyz
    ? `Rank ${card.cardStats?.lvl} | ${card.name}`
    : `Level ${card.cardStats?.lvl} | ${card.name}`,
  type: 'rich',
  color: getCardColor(card.cardType.toString()),
  description: card.desc,
  thumbnail: {
    url: card.image
  },
  fields: card.cardType !== ygoApi.CardTypes.Spell && card.cardType !== ygoApi.CardTypes.Trap
    ? [{
        name: card.cardType === ygoApi.CardTypes.Link
          ? `ATK / Link Value`
          : `ATK / DEF`,
        value: card.cardType === ygoApi.CardTypes.Link
          ? `${card.cardStats?.atk} / ${card.cardStats?.linkVal}`
          : `${card.cardStats?.atk} / ${card.cardStats?.def}`,
        inline: true
    }, {
      name: 'Type / Race / Attribute',
      value: `${card.cardType.toString()} / ${card.race} / ${card.attribute}`
    }]
    : undefined
})

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
      console.log('it\'s a trap!')
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
