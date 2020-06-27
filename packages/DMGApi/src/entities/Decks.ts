import {
  Entity,
  Column,
  ManyToOne,
  ManyToMany,
  PrimaryColumn
} from 'typeorm'

import { Cards } from './Cards'
import { Player } from './Player'

@Entity()
export class Decks {
  @PrimaryColumn({ nullable: false })
  id!: string

  @Column()
  name!: string

  @ManyToMany(() => Cards, cards => cards.decks)
  cards!: Cards[]

  @ManyToOne(() => Player, player => player.decks)
  player!: Player
}
