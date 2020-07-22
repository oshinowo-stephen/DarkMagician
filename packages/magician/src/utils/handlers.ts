import {
  MessageData,
} from 'eris-boiler'

export const error = (message: string): MessageData => ({
  content: process.env.DMG_SUPPORT_SERVER ?? 'https://discord.gg/PjRbWMH',
  embed: {
    url: 'https://discord.gg/https://discord.gg/PjRbWMH',
    title: 'Uh, Oh... It seems that I made a mistake',
    description: `
ERROR : \`\`\`\n${message}\`\`\`\n
Visit the support server to get some help!`,
  },
})
