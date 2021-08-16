import 'reflect-metadata'
import { Connection, IDatabaseDriver, MikroORM } from '@mikro-orm/core'

export { CardEntity } from './entities/Card.entity'
export { DeckEntity } from './entities/Deck.entity'
export { PlayerEntity } from './entities/Player.entity'
export { RarityEntity } from './entities/Rarity.entity'
export { InventoryEntity } from './entities/Inven.entity'

export type MikroConnection = MikroORM<IDatabaseDriver<Connection>>

export const getConnection = async (): Promise<MikroConnection> => await MikroORM.init({
	type: 'postgresql',
	dbName: 'magician_storage',
	entities: [ './entities/*.entity.ts' ],
	clientUrl: process.env.DMG_DATABASE_CONN,
})
