import { Forge } from '@hephaestus/eris'
import { logger } from '@hephaestus/utils'
import config from 'config'
import { join } from 'path'

const main = async (): Promise<void> => {
    if (config.get('NODE_ENV') !== 'prod') {
        await import('dotenv').then(({ config }) => config())
    } else {
        await import('docker-secret-env').then(({ load }) => load())
    }

    const magician = new Forge(config.get('BOT_TOKEN'), {
        intents: [
            'guilds',
            'guildEmojis',
            'guildMessages',
            'guildIntegrations',
            'guildEmojisAndStickers',
        ]
    })

    magician.client.on('ready', () => {
        const { user } = magician.client

        logger.info(`${user.username} is now connected, and ready to-go!`)
    })

    magician.commands.add(join(__dirname, 'commands'))

    await magician.connect().catch(logger.error)
    logger.info('App connecting to DiscordAPI') 
}

main().then(() => undefined)
