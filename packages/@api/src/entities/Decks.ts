import {
  Entity,
  Column,
  JoinTable,
  ManyToOne,
  ManyToMany,
  PrimaryColumn,
} from 'typeorm'

import {
  Player,
} from './Player'

import {
  Cards,
} from './Cards'

@Entity()
export class Decks {

  @PrimaryColumn()
  public id!: string

  @Column()
  public name!: string

  @ManyToOne(() => Player, (player) => player.id)
  public player!: Promise<Player[]>

  @ManyToMany(() => Cards, (cards) => cards.decks)
  @JoinTable()
  public cards!: Promise<Cards[]>

}
