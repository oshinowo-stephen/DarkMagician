import { Magician } from '../modules/magician'

import {
  Command,
} from 'eris-boiler'

// import {
//   Embed
// } from 'eris'

import {
  // Card,
  // CardTypes,
  YgoWrapper as ygoApi
} from '@darkmagician/common'

// import {
//   Pages,
//   PageBuilder
// } from '../modules/utils/pageBuilder'

export default new Command<Magician>({
  name: 'search',
  description: 'Search\'s for a card',
  options: {
    aliases: ['lookup', 's', 'card']
  },
  run: async (_bot, { params }) => {
    if (params.length === 0) {}

    try {
      const cards = await ygoApi.searchCard(
        params.join('+').toLowerCase()
      )

      console.log(cards)
    } catch (error) {
      console.log(error)

      throw error
    }

    // const pageData: Pages = []

    // for (let i = 0; i > cards.length; i++) {
    //   pageData[i] = constructCard(cards[i])
    // }

    // const builder = new PageBuilder(bot, pageData)

    // await builder.constructMessage(msg.channel)

    return 'okay...'
  }
})

// const constructCard = (card: Card): Embed => ({
//   title: card.cardType === CardTypes.Spell ||
//     card.cardType === CardTypes.Trap ||
//     card.cardType === CardTypes.Link
//   ? `${card.name}`
//   : card.cardType === CardTypes.Xyz
//     ? `Rank ${card.cardStats?.lvl} | ${card.name}`
//     : `Level ${card.cardStats?.lvl} | ${card.name}`,
//   type: 'rich',
//   description: card.desc,
//   thumbnail: {
//     url: card.image
//   },
//   fields: card.cardType !== CardTypes.Spell && card.cardType !== CardTypes.Trap
//     ? [{
//         name: card.cardType === CardTypes.Link
//           ? `ATK / Link Value`
//           : `ATK / DEF`,
//         value: card.cardType === CardTypes.Link
//           ? `${card.cardStats?.atk} / ${card.cardStats?.linkVal}`
//           : `${card.cardStats?.atk} / ${card.cardStats?.def}`,
//         inline: true
//     }, {
//       name: 'Type / Race / Attribute',
//       value: `${card.cardType.toString()} /${card.race} / ${card.attribute}`
//     }]
//     : undefined
// })
