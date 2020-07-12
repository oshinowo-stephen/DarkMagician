import { logger } from '@darkmagician/common'

import { DiscordEvent } from 'eris-boiler'

import { Magician } from '../modules/magician'

const COOLDOWNS: Map<string, number> = new Map<string, number>()

export default new DiscordEvent<Magician>({
  name: 'messageCreate',
  run: async (bot, msg) => {
    if (msg.author.bot) {
      return
    }

    const toCooldown = COOLDOWNS.get(msg.author.id)

    console.log(toCooldown, Date.now())

    if (toCooldown !== undefined) {
      if (toCooldown < Date.now()) {
        console.log(toCooldown)

        COOLDOWNS.delete(msg.author.id)
      }
    }

    if (toCooldown === undefined) {
      await updateBal(bot, msg.author.id)

      COOLDOWNS.set(msg.author.id, Date.now() + 5000)
    }
  },
})

const updateBal = async (bot: Magician, player: string): Promise<void> => {
  try {
    const p = await bot.playerWrapper.fetch(player)

    const newBal = (p.bal + Math.floor(Math.random() * 10) * 1000)

    await bot.playerWrapper.update(player, newBal)
  } catch (error) {
    console.log(error)

    logger.log('warn', 'player doesn\'t exist')
  }
}
