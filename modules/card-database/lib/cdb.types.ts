export enum OtherRace {
	NORMAL = 0,
	CONTINOUS = 1,
	COUNTER  = 2,
	QUICK_PLAY = 3,
	RITUAL = 4,
	FIELD = 5
}

export enum MonsterRace {
	AQUA = 'Aqua',
	BEAST = 'Beast',
	BEAST_WARRIOR = 'Beast-Warrior',
	CREATOR_GOD = 'Creator-God',
	CYBERSE = 'Cyberse',
	DINOSAUR = 'Dinosaur',
	DIVINE_BEAST = 'Divine-Beast',
	DRAGON = 'Dragon',
	FAIRY = 'Fairy',
	FIEND = 'Fiend',
	FISH = 'Fish',
	INSECT = 'Insect',
	MACHINE = 'Machine',
	PLANT = 'Plant',
	PSYCHIC = 'Psychic',
	PYRO = 'Pyro',
	REPTILE = 'Reptile',
	ROCK = 'Rock',
	SEA_SERPENT = 'Sea Serpent',
	SPELLCASTER = 'Spellcaster',
	THUNDER = 'Thunder',
	WARRIOR = 'Warrior',
	WINGED_BEAST = 'Winged-Beast'
}

export enum OriginalType {
	NORMAL = 0,
	EFFECT = 1,
	FUSION = 2,
	RITUAL = 3,
	SYNCHRO = 4,
	XYZ = 5,
	PEND = 6,
	LINK = 7,
	FLIP = 8,
	TUNER = 9,
	UNION = 10,
	GEMINI = 11,
	TOON = 12,
	SPIRIT = 13,
	SPELL = 14,
	SKILL = 15,
	TRAP = 16,
}

export interface CardProperties {
	fuzzy?: boolean,
	is_trap_only?: boolean,
	is_spell_only?: boolean,
	is_monster_only?: boolean,
}

export interface CardIndex {
	name: string
	desc: string
	other_info?: OtherInfo
	monster_info?: MonsterInfo
}

export interface OtherInfo {
	race: OtherRace
	type: OriginalType
}

export interface MonsterInfo {
	atk: number
	lvl: number
	def?: number
	scale?: number
	markers?: LinkMarker[]
	race: MonsterRace
	type: OriginalType[]
}

export enum LinkMarker {
	Bottom,
	Left,
	Up,
	Right,
	UpRight,
	BottomRight,
	UpLeft,
	BottomLeft,
}

export interface IncomingResponse {
	error?: string
	data: IncomingRawCardInfo[]
}

export interface IncomingRawCardInfo {
	name: string
	desc: string
	type?: string
	atk?: number
	def?: number
	scale?: number
	linkval?: number
	linkmarkers?: string[]
	level?: number
	race?: string
	attribute?: string,
	card_sets?: IncomingRawCardSet[]
	card_images?: IncomingRawCardImgs[]
	card_prices?: IncmoingRawCardPrice[]
}

export interface IncmoingRawCardPrice {
	cardmarket_price: string
	tcgplayer_price: string
	ebay_price: string
	amazon_price: string
	coolstuffinc_price: string
}

export interface IncomingRawCardImgs {
	image_url: string
	image_url_small: string
}

export interface IncomingRawCardSet {
	set_name: string
	set_code: string
	set_rarity: string
	set_rarity_code: string
	set_price: string
}
