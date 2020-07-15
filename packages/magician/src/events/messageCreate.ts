import { logger } from '@darkmagician/common'

import { Message } from 'eris'
import { DiscordEvent } from 'eris-boiler'

import { Magician } from '../modules/magician'

const COOLDOWNS: Map<string, number> = new Map<string, number>()

export default new DiscordEvent<Magician>({
  name: 'messageCreate',
  run: async (bot: Magician, msg: Message) => {
    if (!msg.author.bot && !msg.content.startsWith(bot.ora.defaultPrefix)) {
      const toCooldown = COOLDOWNS.get(msg.author.id)

      if (toCooldown !== undefined) {
        if (toCooldown < Date.now()) {
          COOLDOWNS.delete(msg.author.id)
        }
      }

      if (toCooldown === undefined) {
        await updateBal(bot, msg.author.id)

        COOLDOWNS.set(msg.author.id, Date.now() + 5000)
      }
    }
  },
})

const updateBal = async (bot: Magician, player: string): Promise<void> => {
  try {
    const p = await bot.players.fetch(player)

    const newBal = (p.bal + Math.floor(Math.random() * 10) * 1000)

    await bot.players.update(player, newBal)
  } catch (error) {
    logger.log('warn', `cannot update balance, player: ${player} doesn't exist`)
  }
}
