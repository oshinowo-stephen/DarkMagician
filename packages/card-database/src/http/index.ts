import got from 'got'

const BASE_URL: string = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?misc=Yes'

const forgeRequest = async (url: string): Promise<IncomingCard[]> => {
	const { body } = await got(url)

	const { data } = JSON.parse(body) as IncomingResponse

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

export interface IncomingResponse {
	data: IncomingCard[]
}

export interface IncomingCard {
	id: number
	name: string
	type: string
	desc: string
	atk?: number
	def?: number
	level?: number
	race?: string
	linkval?: number
	archetype?: string
	linkmarkers?: string[]
	attribute?: string
	card_sets?: IncomingCardSet[]
	card_images?: IncomingCardImg[]
	card_prices?: IncomingCardPrice[]
	misc_info?: IncomingMiscInfo[]
}

export interface IncomingCardSet {
	set_name: string
	set_code: string
	set_rarity: string
	set_rarity_code: string
	set_price: string
}

export interface IncomingCardImg {
	id: number
	img_url: string
	img_url_small: string
}

export interface IncomingCardPrice {
	cardmarket_price: string
	tcgplayer_price: string
	ebay_price: string
	amazon_price: string
	coolstuffinc_price: string
}

export interface IncomingMiscInfo {
	views: number
	viewsweek: number
	upvotes: number
	downvotes: number
	formats: string[]
	tcg_date?: string
	ocg_date?: string
	konami_id: number
	has_effect: number
}

export interface CardOptions {
	atk: number
	def: number
	fuzzy: boolean
}

