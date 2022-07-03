import { SubCommand } from '@hephaestus/eris'

export const search: SubCommand = {
    type: 1,
    name: 'search',
    description: 'Look-up card info!',
    options: [
        {
            type: 3,
            required: true,
            name: 'name',
            description: 'card info\'s name'
        }
    ],
    action: async ({ createMessage, data }) => {
        const incomingParam = data.options
            ?.find(({ name }) => name === 'name')

        if (incomingParam?.type !== 3) {
            await createMessage('Missing input!')
        } else {
            await createMessage(`Got it! Searching for ${incomingParam?.value}...`)
        }
    }
}
