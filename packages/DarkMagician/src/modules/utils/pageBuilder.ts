import {
  Embed,
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

    await message.addReaction(':arrow_right:')
    await message.addReaction(':arrow_left:')
    await message.addReaction(':x:')

    this.client.on('messageReactionAdd', async (msg, emoji) => {
      if (msg.id === message.id) {
        console.log(emoji)
        switch (emoji.name) {
          case ':arrow_right:':
            this.currentPage += 1
            message.edit({
              embed: this.constructEmbed()
            })
            break
          case ':arrow_right:':
            this.currentPage -= 1
            message.edit({
              embed: this.constructEmbed()
            })
            break
          default:
            await message.delete()
        }
      }
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
