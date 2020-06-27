import {
  Entity,
  Column,
  OneToMany,
  PrimaryColumn
} from 'typeorm'

import { Cards } from './Cards'
import { Decks } from './Decks'

@Entity()
export class Player {
  @PrimaryColumn({ nullable: false })
  id!: string

  @Column()
  currency!: number

  @OneToMany(() => Cards, cards => cards.player)
  cards!: Cards[]

  @OneToMany(() => Decks, decks => decks.player)
  decks!: Decks[]
}
