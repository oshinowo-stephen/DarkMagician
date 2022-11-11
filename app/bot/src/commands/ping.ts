import { createCommand } from '@hephaestus/eris'

export default createCommand({
   type: 1,
   name: 'ping', 
   description: 'some ping command',
   action: async (ctx): Promise<void> => {
        ctx.createMessage('Pong!')
   }
})
