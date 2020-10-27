import { Command } from 'eris-boiler'

export default new Command({
  name: 'ping',
  description: 'pings the bot',
  run: () => 'Pong, from DMG! ;D',
})
