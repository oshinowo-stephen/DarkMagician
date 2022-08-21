import { createCommand } from '@hephaestus/eris'

import { getCardInfo } from '../../services/parsed-cards'
// import { toPascel: _pascelCase } from '../../services/endpoint'

export const info = createCommand({
    type: 1,
    name: 'info',
    description: 'relay back card info for the inputed card.',
    options: [
        {
            type: 3,
            required: true,
            name: 'query',
            description: 'The desired card.',
        }
    ] as const,
    action: async (interaction, args): Promise<void> => {
        let incomingCardInfo

        try {
            incomingCardInfo = await getCardInfo(args['query'].value)
        } catch(err) {
            console.error(err)

            return interaction.createMessage({
                content: `<@${interaction.member.id}>, This card is invalid, try again...`,
                flags: 64
            })
        }
    
        const cardData = incomingCardInfo['card_data']
        const cardImgs = incomingCardInfo['card_imgs']
        const cardSets = incomingCardInfo['card_sets']
        const cardFormat = incomingCardInfo['card_format']
        const monsterInfo = cardData['monster_info']

        console.log(cardImgs)
        console.log(cardSets)
        console.log(cardFormat)
        console.log(monsterInfo)

        interaction.createMessage({
            content: 'Working In Progess... But here\'s the effect:\n' + cardData.desc  
        })
    }
})

