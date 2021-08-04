import fetch from 'node-fetch'
import {
	CardOptions,
	IncomingCard,
	IncomingResponse,
} from '@magician/card-database'

const BASE_URL: string = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?misc=Yes'

const forgeRequest = async (url: string): Promise<IncomingCard[]> => {
	const { json } = await fetch(url)

	const { data } = await json() as IncomingResponse

	return data
}

const addPathFromOptions = (url: string, opts?: CardOptions): string => {
	if (opts === undefined) return url

	const entries = Object.entries(opts)

	for (const [name, val] of entries) {
		if (name === 'fuzzy') continue
		if (val === undefined) continue

		url.concat(`&${name}=${val}`)
	}

	return url
}

export const get = async (
	card: string,
	opts?: CardOptions,
): Promise<IncomingCard> => {
	const baseRequestURL = opts?.fuzzy
		? `${BASE_URL}&fname=${card}`
		: `${BASE_URL}&name=${card}`

	const requestURL = addPathFromOptions(baseRequestURL, opts)

	const incomingCard = await forgeRequest(requestURL)

	return incomingCard[0]
}