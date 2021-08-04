import {
	get as http,
} from './http'

import {
	CardOptions,
	IncomingCard
} from '@magician/card-database'

import {
	fetch as get,
	store as set,
} from '@magician/cache'

export { get as http } from './http'

export const fetch = async (
	name: string,
	opts?: CardOptions,
): Promise<IncomingCard> => {
	let response: IncomingCard

	try {
		response = await get<IncomingCard>(name)
	} catch (_) {
		try {
			response = await http(name, opts)

			await set<IncomingCard>(name, response)
		} catch (error) {
			throw new Error('Invalid Request.')
		}
	}

	return response
}