import {
  Message,
} from 'eris'

import {
  logger,
} from '@darkmagician/common'

export const error = (message: string, msg: Message): void => {
  msg.channel.createMessage({
    content: process.env.DMG_SUPPORT_SERVER ?? '',
    embed: {
      title: 'Uh, Oh... It seems that I made a mistake',
      description: `ERROR : ${message}\nVisit the support server for more info`,
    },
  }).catch((error: string) => logger.error(error))
}
