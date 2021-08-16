import { Entity, PrimaryKey, Property } from '@mikro-orm/core'

@Entity()
export class MarketItemEntity {

	@PrimaryKey()
	id!: string

	@Property()
	name!: string

	@Property()
	desc!: string

	@Property()
	item_id!: string

	@Property()
	price!: number

}
