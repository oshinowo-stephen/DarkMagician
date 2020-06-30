import { Magician } from '../modules/magician'

import {
  Command,
} from 'eris-boiler'

import {
  Embed
} from 'eris'

import { ygoApi } from '@darkmagician/common'

import {
  Pages,
  PageBuilder
} from '../modules/utils/pageBuilder'

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

    const pageData: Pages = []

    for (let i = 0; i < cards.length; i++) {
      console.log(cards[i])

      pageData[i] = constructCard(cards[i])
    }

    const builder = new PageBuilder(bot, pageData)

    await builder.constructMessage(msg.channel)

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
  color: 0xffffff, //getCardColor(card.cardType.toString()),
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

// const getCardColor = (type: string): number => {
//   console.log(type)

//   switch (type) {
//     case 'Normal':
//       return 0xFFDEAD
//     case 'Effect':
//       console.log('number')
//       return 0xCD853F
//     case 'Ritual':
//       return 0xADBCE6
//     case 'Synchro':
//       return 0xFFFFFF
//     case 'Xyz':
//       return 0x09050A
//     case 'Fusion':
//       return 0x703E7D
//     case 'Link':
//       return 0x0048BA
//     case 'Trap':
//       return 0x390047
//     case 'Spell':
//       return 0x00678C
//     case 'Tuner':
//       return 0x00B200
//     case 'Pendulumn':
//       return 0x98ff98
//     default:
//       return 0x00000
//   }
// }
