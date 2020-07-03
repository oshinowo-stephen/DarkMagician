import {
  Entity,
  Column,
  ManyToOne,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
} from 'typeorm'

import {
  Player,
} from './Player'

import {
  Decks,
} from './Decks'

@Entity()
export class Cards {

  @PrimaryColumn()
  public id!: number

  @Column()
  public apiEp!: string

  @ManyToOne(() => Player, (player) => player.id)
  public player!: Player

  @ManyToMany(() => Decks, (decks) => decks.cards)
  @JoinTable()
  public decks!: Promise<Decks[]>

}
