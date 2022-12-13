import { createCommand } from '@hephaestus/eris'

import { get, CardRequest } from '@darkmagician/baton'

export default createCommand({
    type: 1,
    name: 'info',
    description: 'Search card info for query',
    action: async (ctx): Promise<void> => {
        const incomingCard = await get({
            name: 'dark magician'
        } as CardRequest)

        console.log(incomingCard)

        ctx.createMessage('Invalid Message')        
    }
})