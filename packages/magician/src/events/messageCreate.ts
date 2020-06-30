import { DiscordEvent } from 'eris-boiler'
import { Magician } from '../modules/magician'

export default new DiscordEvent<Magician>({
  name: 'messageCreate',
  run: (_bot, _msg) => {
    console.log(_msg.content)
  }
})
