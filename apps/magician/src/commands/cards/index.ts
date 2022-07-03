import { TopLevelCommand } from '@hephaestus/eris'

import { search } from './search'

const command: TopLevelCommand = {
    type: 1,
    name: 'cards',
//    guildId: '706565700923162706',
    description: 'View your card collection, search for card information!',
    options: [ search ]       
}

export default command
