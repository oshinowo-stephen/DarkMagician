import { CardExType, CardOgType, CardRace, CardType } from '@magician/storage'
import { Entity, Enum, Property, ManyToOne, PrimaryKey } from '@mikro-orm/core'

import { DeckEntity } from './Deck.entity'
import { InventoryEntity } from './Inven.entity'

@Entity()
export class CardEntity {

	@PrimaryKey()
	id!: string

	@Property()
	name!: string

	@Property({ columnType: 'text', lazy: true })
	desc!: string

	@Enum()
	race!: CardRace

	@Enum()
	type!: CardOgType

	@Enum()
	ex_type!: CardExType

	@Enum()
	card_type!: CardType

	@Property()
	attribute!: string

	@Property()
	atk!: number

	@Property()
	def!: number

	@Property()
	rarity!: string

	@ManyToOne(() => InventoryEntity, { mapToPk: true })
	player_inventory!: string

	@ManyToOne()
	in_deck?: DeckEntity

}
