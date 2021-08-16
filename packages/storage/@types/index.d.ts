declare module "@magician/storage" {

	export enum StorageAction {
		STORE = 0,
		FETCH = 1,
		DELETE = 2,
		UPDATE = 3,
	}

	export enum CardRace {
		AQUA = 'Aqua',
		BEAST = 'Beast',
		BEAST_WARRIOR = 'Beast-Warrior',
		CREATOR_GOD = 'Creator-God',
		CYBERSE = 'Cyberse',
		DINOSAUR = 'Dinosaur',
		DIVINE_BEAST = 'Divine-Beast',
		WINGED_BEAST = 'Winged-Beast',
		DRAGON = 'Dragon',
		FISH = 'Fish',
		FIEND = 'Fiend',
		FAIRY = 'Fairy',
		SPELLCASTER = 'Spellcaster',
		THUNDER = 'Thunder',
		PSYCHIC = 'Psychic',
		INSECT = 'Insect',
		MACHINE = 'Machine',
		ROCK = 'Rock',
		SEA_SERPENT = 'Sea Serpent',
		REPTILE = 'Reptile',
		WARRIOR = 'Warrior',
		PYRO = 'Pyro',
		PLANT = 'Plant'
	}

	export enum CardOgType {
		EFFECT = 'Effect',
		NORMAL = 'Normal',
		COUNTER = 'Counter',
		CONTINOUS = 'Continous',
		QUICK_PLAY = 'QuickPlay',
		RITUAL = 'Ritual'
	}

	export enum CardExType {
		RITUAL = 'Ritual',
		TUNER = 'Tuner',
		FLIP = 'Flip',
		GEMINI = 'Gemini',
		UNION = 'Union',
		FUSION = 'Fusion',
		TOON = 'Toon',
		SPIRIT = 'Spirit',
		SYNCHRO = 'Synchro',
		XYZ = 'Xyz',
		PEND = 'Pendulum',
		PEND_FUSION = 'Pendulum,Fusion',
		PEND_XYZ = 'Pendulum,Xyz',
		PEND_SYNCHRO = 'Pendulum,Synchro',
		LINK = 'Link'
	}

	export enum CardType {
		TRAP = 0,
		SPELL = 1,
		MONSTER = 2
	}

	export enum CardRarity {
		COMMON = 'Common',
		RARE = 'Rare',
		ULTRA_RARE = 'UltraRare',
		SECRET_RARE = 'SecretRare'
	}

}