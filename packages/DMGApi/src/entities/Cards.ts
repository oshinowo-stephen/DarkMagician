import {
  Entity,
  Column,
  ManyToOne,
  ManyToMany,
  PrimaryColumn
} from 'typeorm'

import { Player } from './Player'
import { Decks } from './Decks'

@Entity()
export class Cards {
  @PrimaryColumn({ nullable: false })
  id!: number

  @Column({ nullable: false })
  apiEndpoint!: string

  @ManyToMany(() => Decks, decks => decks.cards)
  decks!: Decks[]

  @ManyToOne(() => Player, player => player.id)
  player!: Player
}
