import { createCommand } from '@hephaestus/eris'

import { getCardInfo } from '../../services/parsed-cards'
import { toPascel } from '../../services/endpoint'

export const info = createCommand({
    type: 1,
    name: 'info',
    description: 'relay back card info for the inputed card.',
    options: [
        {
            type: 3,
            required: true,
            name: 'cards-name',
            description: 'The desired card.',
        }
    ] as const,
    action: async (interaction, args): Promise<void> => {
        const incomingCardInfo = await getCardInfo(args['cards-name'].value)

        const cardData = incomingCardInfo['card_data']
        const cardImgs = incomingCardInfo['card_imgs']
        const cardFormat = incomingCardInfo['card_format']
        const monsterInfo = cardData['monster_info']

        console.log(cardFormat)

        interaction.createMessage({
            embeds: [
                {
                    title: toPascel(cardData.name),
                    description: cardData.desc,
                    image: {
                        url: cardImgs[0].image
                    },
                    fields: monsterInfo
                        ? [
                            {
                                name: `ATK / ${monsterInfo.lval ? 'LINK VAL' : 'DEF'}`,
                                value: `${monsterInfo.atk} / ${ monsterInfo.lval ? monsterInfo.lval : monsterInfo.def }`,
                                inline: true
                            }
                        ]
                        : undefined
                }
            ]
        })
    }
})

