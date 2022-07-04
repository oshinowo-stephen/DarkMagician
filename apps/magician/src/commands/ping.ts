import { TopLevelCommand } from '@hephaestus/eris'

const command: TopLevelCommand = {
    type: 1,
    name: 'ping',
    description: 'basic test',
    action: (interaction) => {
        interaction.createMessage('Pong!')
    },
}

export default command
