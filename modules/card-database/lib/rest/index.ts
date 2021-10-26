// Raw YGO Card Info

import needle from 'needle'
import {
	IncomingRawCardInfo,
	IncomingResponse,
} from './types'

const BASE_URL: string = 'https://db.ygoprodeck.com/api/v7/cardinfo.php'

export const forgeRequest = async (name: string, opts?: YGOProRestOptions): Promise<IncomingRawCardInfo[]> => {
	try {
		let reqURL: string = ''
		let baseURL: string = BASE_URL
		name = name.split(' ').join('+')

		reqURL += baseURL += opts?.fuzzy
			? `?fname=${name}`
			: `?name=${name}`

		reqURL += attachRequestParams(opts)

		const incomingResponse = await needle('get', reqURL)

		const response: IncomingResponse = incomingResponse.body

		if (response.error) {
			throw new Error('Invalid Card')
		}

		return response.data
	} catch (error) {
		throw new Error(`Issue requesting this card: ${error}`)
	}

}

const attachRequestParams = (opts?: YGOProRestOptions): string => {
	let requestURL!: string
	if (!opts) return ''

	for (const [ param, value ] of Object.entries(opts)) {
		if (param === 'fuzzy') {
			continue
		} else {
			requestURL += `&${param}=${value}`
		}
	}

	return requestURL
}

export interface YGOProRestOptions {
	fuzzy: boolean,
}