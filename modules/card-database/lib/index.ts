import {
	CardIndex,
	CardProperties,
	IncomingRawCardInfo,
	LinkMarker,
	MonsterRace,
	OriginalType,
	OtherRace,
} from './cdb.types'
import { cache } from 'utils'

import { forgeRequest, YGOProRestOptions } from './rest'

const mapPropsIntoOpts = (props: CardProperties): YGOProRestOptions => ({
	fuzzy: props.fuzzy ?? false
})

const mapToOriginalType = (incomingType: string): OriginalType[] => {
	let outgoingTypes: OriginalType[] = []

	incomingType
		.split(' ')
		.filter((t) => t !== 'Monster' && t !== 'Card')
		.forEach((t) => {
			switch (t.toLowerCase()) {
				case 'trap':
					outgoingTypes.push(OriginalType.TRAP)
					break
				case 'spell':
					outgoingTypes.push(OriginalType.SPELL)
					break
				case 'normal':
					outgoingTypes.push(OriginalType.NORMAL)
					break
				case 'effect':
					outgoingTypes.push(OriginalType.EFFECT)
					break
				case 'fusion':
					outgoingTypes.push(OriginalType.FUSION)
					break
				case 'ritual':
					outgoingTypes.push(OriginalType.RITUAL)
					break
				case 'synchro':
					outgoingTypes.push(OriginalType.SYNCHRO)
					break
				case 'tuner':
					outgoingTypes.push(OriginalType.TUNER)
					break
				case 'gemini':
					outgoingTypes.push(OriginalType.GEMINI)
					break
				case 'union':
					outgoingTypes.push(OriginalType.UNION)
					break
				case 'xyz':
					outgoingTypes.push(OriginalType.XYZ)
					break
				case 'toon':
					outgoingTypes.push(OriginalType.TOON)
					break
				case 'link':
					outgoingTypes.push(OriginalType.LINK)
					break
				case 'spirit':
					outgoingTypes.push(OriginalType.SPIRIT)
					break
				case 'pendulum':
					outgoingTypes.push(OriginalType.PEND)
					break
				default:
					outgoingTypes.push(OriginalType.SKILL)
			}
		})

		return outgoingTypes
}

const mapToMonsterRace = (incomingRace: string): MonsterRace => {
	let key = Object.keys(MonsterRace)
		.filter((k) => k.toLowerCase() === incomingRace.toLowerCase())[0]

	return MonsterRace[key as 'AQUA'
		| 'BEAST'
		| 'BEAST_WARRIOR'
		| 'CREATOR_GOD'
		| 'CYBERSE'
		| 'DINOSAUR'
		| 'DRAGON'
		| 'DIVINE_BEAST'
		| 'DRAGON'
		| 'FAIRY'
		| 'FISH'
		| 'FIEND'
		| 'INSECT'
		| 'MACHINE'
		| 'PLANT'
		| 'PSYCHIC'
		| 'PYRO'
		| 'REPTILE'
		| 'ROCK'
		| 'SEA_SERPENT'
		| 'SPELLCASTER'
		| 'THUNDER'
		| 'WARRIOR'
		| 'WINGED_BEAST'
	]
	// MonsterRace[enumValue as keyof typeof MonsterRace]
	// switch (incomingRace.toLowerCase()) {
	// 	case 'beast':
	// 		return MonsterRace.BEAST
	// 	case 'beast-warrior':
	// 		return MonsterRace.BEAST_WARRIOR
	// 	case 'winged-beast':
	// 		return MonsterRace.WINGED_BEAST
	// 	case 'dragon':
	// 		return MonsterRace.DRAGON
	// 	case 'creator-god':
	// 		return MonsterRace.CREATOR_GOD
	// 	case 'cyberse':
	// 		return MonsterRace.CYBERSE
	// 	case 'dinosaur':
	// 		return MonsterRace.DINOSAUR
	// 	case 'divine-beast':
	// 		return MonsterRace.DIVINE_BEAST
	// 	case 'fairy':
	// 		return MonsterRace.FAIRY
	// 	case 'fiend':
	// 		return MonsterRace.FIEND
	// 	case 'fish':
	// 		return MonsterRace.FISH
	// 	case 'insect':
	// 		return MonsterRace.INSECT
	// 	case 'machine':
	// 		return MonsterRace.MACHINE
	// 	case 'plant':
	// 		return MonsterRace.PLANT
	// 	case 'psychic':
	// 		return MonsterRace.PSYCHIC
	// 	case 'pyro':
	// 		return
	// 	case 'reptile':
	// 	case 'rock':
	// 	case 'sea serpent':
	// 	case 'spellcaster':
	// 	case 'thunder':
	// 	case 'warrior':
	// 	case 'winged-beast':
	// 	default:
	// 		return MonsterRace.AQUA
	// }
}

const mapToOtherRace = (incomingRace: string): OtherRace => {
	const r = incomingRace.toLowerCase()

	switch (r) {
		case 'field':
			return OtherRace.FIELD
		case 'continous':
			return OtherRace.CONTINOUS
		case 'counter':
			return OtherRace.COUNTER
		case 'quick-play':
			return OtherRace.QUICK_PLAY
		case 'ritual':
			return OtherRace.RITUAL
		default:
			return OtherRace.NORMAL
	}
}

const mapToMonsterMarkers = (incomingMarkers: string[]): LinkMarker[] => {
	const markers: LinkMarker[] = []

	for (const m of incomingMarkers) {
		switch(m.toLowerCase()) {
			case 'top':
				markers.push(LinkMarker.Up)
				break
			case 'bottom':
				markers.push(LinkMarker.Bottom)
				break
			case 'left':
				markers.push(LinkMarker.Left)
				break
			case 'right':
				markers.push(LinkMarker.Right)
				break
			case 'bottom-left':
				markers.push(LinkMarker.BottomLeft)
				break
			case 'bottom-right':
				markers.push(LinkMarker.BottomRight)
				break
			case 'top-left':
				markers.push(LinkMarker.UpLeft)
				break
			case 'top-right':
				markers.push(LinkMarker.UpRight)
				break
		}
	}

	return markers
}

const parseRawCard = (incomingCard: IncomingRawCardInfo): CardIndex => {
	const embeddedCardIndex: CardIndex = {
		name: incomingCard.name,
		desc: incomingCard.desc,
	}

	if (incomingCard.atk !== undefined)  {
		embeddedCardIndex.monster_info = {
			atk: incomingCard.atk,
			def: incomingCard.def,
			lvl: incomingCard.level === undefined
				? incomingCard?.linkval as number
				: incomingCard.level,
			scale: incomingCard.scale,
			markers: incomingCard.linkmarkers !== undefined
				? mapToMonsterMarkers(incomingCard?.linkmarkers as string[])
				: [],
			type: mapToOriginalType(incomingCard?.type as string),
			race: mapToMonsterRace(incomingCard?.race as string)
		}
	} else {
		embeddedCardIndex.other_info = {
			race: mapToOtherRace(incomingCard?.race as string),
			type: mapToOriginalType(incomingCard?.type as string)[0]
		}
	}

	return embeddedCardIndex
}

export const fetch = async (name: string, p?: CardProperties): Promise<CardIndex[]> => {
	let incomingCards: IncomingRawCardInfo[]
	const parsedCards: CardIndex[] = []

	try {
		await cache.fetch<CardIndex>(name)
	} catch (_) {
		try {
			incomingCards = await forgeRequest(name, p !== undefined ? mapPropsIntoOpts(p) : undefined)

			for (const card of incomingCards) {
				const parsed = parseRawCard(card)

				try {
					await cache.store<CardIndex>(parsed.name, parsed)
				} catch (error) {
					throw error
				}

				parsedCards.push(parsed)
			}
	} catch (err) {
			throw err
		}
	}

	return parsedCards
}