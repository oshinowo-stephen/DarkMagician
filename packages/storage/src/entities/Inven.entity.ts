import { Entity, PrimaryKey, Property } from '@mikro-orm/core'

@Entity()
export class InventoryEntity {

	@Property()
	id!: string

	@PrimaryKey()
	player!: string

	@Property()
	balance!: number

}