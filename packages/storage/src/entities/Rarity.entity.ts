import { CardEntity } from './Card.entity'
import { CardRarity } from '@magician/storage'
import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core'

@Entity()
export class RarityEntity {

	@PrimaryKey()
	id!: string

	@ManyToOne()
	card!: CardEntity

	@Property()
	rarity!: CardRarity

}