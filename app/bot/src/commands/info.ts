import { createCommand } from '@hephaestus/eris'

import { get, CardRequest } from '@darkmagician/baton'

export default createCommand({
    type: 1,
    options: [
        {
            type: 3,
            required: true,
            name: 'query',
            description: 'Grabs card info of given query'
        }
    ],
    name: 'info',
    description: 'Search card info for query',
    action: async (interaction, args): Promise<void> => {
        try {
            const info = await get({
                card_name: args['query'].value,
                opts: undefined
            })

            interaction.createMessage({
                embeds: [
                    {
                        title: info.name,
                        description: `
${info.desc}
                        `,
                        image: info.card_imgs[0].url
                    }
                ]
            })
        } catch (_error) {
            interaction.createMessage({
                content: `<@${interaction.member.id}>, I'm sorry ${_error}...`,
                flags: 64
            })
        }
    }
})