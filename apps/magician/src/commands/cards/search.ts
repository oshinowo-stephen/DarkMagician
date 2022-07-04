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
    action: async (interaction) => {
        const parentCommand = interaction.data.options
            ?.find(({ name }) => name === 'search')

        if (parentCommand.type !== 1) {
            return
        }

        const commandParam = parentCommand?.options
            ?.find(({ name }) => name === 'name')
        
        if (commandParam?.type !== 3) {
            await interaction.createMessage('Missing input!')
        } else {
            await interaction.createMessage(`Got it! Searching for ${commandParam?.value}...`)
        }
    }
}
