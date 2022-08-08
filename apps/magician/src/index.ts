import { Hephaestus as Forge } from '@hephaestus/eris'
import { logger } from '@hephaestus/utils'
import config from 'config'
import { join as _join } from 'path'

const main = async (): Promise<void> => {
    if (config.get('NODE_ENV') !== 'prod') {
        import('dotenv').then(({ config }) => config())
    } else {
        import('docker-secret-env').then(({ load }) => load())
    }

    const magician = new Forge(config.get('BOT_TOKEN'), {
        intents: [
            'guilds',
            'guildMessages',
        ]
    })

    magician.client.on('ready', () => {
        const { user } = magician.client

        logger.info(`${user.username} is now connected, and ready to-go!`)
    })

    magician.commands.forge(_join(__dirname, 'commands'))

    await magician.connect()
    logger.info('App connecting to DiscordAPI') 
}

main().catch(console.error)
