import {
  Embed,
  Message,
  TextableChannel,
} from 'eris'

import { Magician } from '@modules/magician'

export type Pages = Embed[]

export class PageBuilder {
  pages: Pages
  client: Magician
  currentPage: number

  constructor (client: Magician, pages: Pages) {
    this.pages = pages
    this.client = client
    this.currentPage = 0
  }

  async constructMessage (channel: TextableChannel): Promise<void> {
    const message = await channel.createMessage({
      embed: this.constructEmbed()
    })

    await message.addReaction('❎')
    await message.addReaction('⬅️')
    await message.addReaction('➡️')

    this.client.on('messageReactionAdd', async (msg: Message, emoji) => {
      if (message !== undefined) {
        if (msg.id === message.id) {
          console.log(emoji)
          await this.handleAction(message, msg.reactions, emoji.name)
        }
      }
    })

    setTimeout(() => this.removeMessage(message), (60*1000) * 5)
  }

  async handleAction (msg: Message, reactions: any, action: string) {
    const usrs = await msg.getReaction(action)

    switch (action) {
      case '➡️':
        if (usrs[0].id !== '494643169091387402') {
          console.log((this.currentPage) + 1, this.pages.length)
          if ((this.currentPage + 1) < this.pages.length) {
            this.currentPage += 1

            await msg.edit({
              embed: this.constructEmbed()
            })


          }
          if (reactions[action].count >= 2) {
              const user = usrs.reduce((_, cv) => {
                return cv.id !== '494643169091387402'
                  ? cv
                  : _
              })

              msg.removeReaction(action, user.id)
            }
        }
        break
      case '⬅️':
        if ((this.currentPage - 1) >= 0) {
          this.currentPage -= 1

          await msg.edit({
            embed: this.constructEmbed()
          })

        }
        if (reactions[action].count >= 2) {
              const user = usrs.reduce((_, cv) => {
              return cv.id !== '494643169091387402'
                ? cv
                : _
            })

            msg.removeReaction(action, user.id)
          }
        break
      default:
        this.removeMessage(msg)
    }
  }

  removeMessage (message?: Message) {
    message?.delete()
      .then(() => null)
      .catch((err) => console.log(err))

    this.client.removeListener('messageReactionAdd', () => {
      console.log('removed listenr')
    })
  }

  constructEmbed (): Embed {
    const page = this.pages[this.currentPage]

    return {
      url: page.url,
      type: page.type,
      title: page.title,
      fields: page.fields,
      author: page.author,
      thumbnail: page.thumbnail,
      description: page.description
    }
  }
}
