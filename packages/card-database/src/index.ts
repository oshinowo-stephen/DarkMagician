import {
	get as http,
	CardOptions,
	IncomingCard
} from './http'

import { fetch, store } from '@magician/cache'

export { get as http } from './http'

export const retrieve = async (
	name: string,
	opts?: CardOptions,
): Promise<IncomingCard> => {
	let response: IncomingCard = {} as IncomingCard

	try {
		response = await fetch<IncomingCard>(name)
	} catch (error) {
		try {
			response = await http(name, opts)

			await store<IncomingCard>(name, response)
		} catch (error) {
			console.error(`Invalid Request | Error: ${error}.`)

			throw new Error(`Invalid Request | Error: ${error}.`)
		}
	}

	return response
}