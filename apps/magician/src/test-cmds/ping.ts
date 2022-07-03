import { TopLevelCommand } from '@hephaestus/eris'

const command: TopLevelCommand = {
    type: 1,
    name: 'ping',
    description: 'basic test',
    async action (interaction) {
        await interaction.createFollowup('Pong!')
    },
}

export default command
