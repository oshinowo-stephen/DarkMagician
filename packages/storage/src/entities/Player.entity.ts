import { Entity, Property, PrimaryKey } from '@mikro-orm/core'

@Entity()
export class PlayerEntity {

	@PrimaryKey()
	id!: string

	@Property()
	name!: string

	@Property()
	exp!: number

	@Property()
	lvl!: number

	@Property()
	startedAt!: number

}