import { createCommand } from '@hephaestus/eris'

import { info } from './search'

export default createCommand({
    type: 1,
    name: 'cards',
    description: 'grabs info on cards...',
    options: [ info ]
}) 
