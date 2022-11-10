import { join as __join, resolve } from 'path'
process.env['NODE_CONFIG_DIR'] = resolve(process.cwd(), '../config')
import { Hephaestus as Forge } from '@hephaestus/eris'
import { logger } from '@hephaestus/utils'
import config from 'config'

const main = async (): Promise<void> => {
    const magician = new Forge(config.get('MAGICIAN_TOKEN'), {
        intents: [
            'guilds',
            'guildMessages'
        ]
    })

    magician.client.on('ready', () => {
        logger.info('Client ready! Magician is now online!')
    })

    magician.commands.forge(__join(__dirname, 'commands'))
    await magician.connect()
    logger.info('App connecting to the DiscordAPI...')
}

main().catch((error) => logger.error(error))