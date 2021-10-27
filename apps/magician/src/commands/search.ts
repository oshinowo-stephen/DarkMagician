import {  } from '@darkmagician/cdb'

import { SlashCommand, CommandOptionType, SlashCreator, CommandContext } from 'slash-create'

export class SearchCommand extends SlashCommand {

	constructor(creator: SlashCreator) {
		super(creator, {
			name: 'search',
			description: 'Searches a card based of input.',
			options: [
				{
					type: CommandOptionType.STRING,
					name: 'card',
					description: 'Please supply a card name.'
				}
			]
		})

		this.filePath = __filename
	}

	async run({ options, user }: CommandContext) {
		if (!options.card) {
			throw new Error(`<@!${user.id}>, Please supply card name.`)
		}



	}

}