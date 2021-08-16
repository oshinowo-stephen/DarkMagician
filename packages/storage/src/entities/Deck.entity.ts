import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { InventoryEntity } from "./Inven.entity";

@Entity()
export class DeckEntity {

	@PrimaryKey()
	id!: string

	@Property()
	name!: string

	@Property({ columnType: 'text', lazy: true })
	desc!: string

	@ManyToOne(() => InventoryEntity, { mapToPk: true })
	player_inventory!: string

}