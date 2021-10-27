import config from 'config'

import { join } from 'path'
import { Magician } from './magician'
import { GatewayServer, SlashCreator } from 'slash-create'


const creator = new SlashCreator({
	applicationID: '494643169091387402',
	token: config.get('BOT_TOKEN')
})

const magician = new Magician(config.get('BOT_TOKEN'), {
	oratorOptions: config.get('oratorOpts'),
	statusManagerOptions: config.get('statusOpts')
})

const gateway = new GatewayServer((h) => magician.on('rawWS', (e) => {
	if (e.t === 'INTERACTION_CREATE') {
		h(e.d)
	}
}))

creator
	.withServer(gateway)
	.registerCommandsIn(join(__dirname, 'commands'))
	.syncCommands()

magician
	.connect()
	.catch(console.error)