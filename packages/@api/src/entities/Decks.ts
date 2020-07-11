import {
  Entity,
  Column,
  JoinTable,
  ManyToOne,
  ManyToMany,
  PrimaryColumn,
} from 'typeorm'

import { Cards } from './Cards'
import { Player } from './Player'

@Entity()
export class Decks {

  @PrimaryColumn()
  public id!: string

  @Column()
  public name!: string

  @ManyToMany(() => Cards, (cards) => cards.decks)
  @JoinTable()
  public cards!: Promise<Cards[]>

  @ManyToOne(() => Player, (player) => player.decks)
  public player!: Player

}
