import {
  Entity,
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

  @ManyToOne(() => Player, (player) => player.id)
  public player!: Player

  @ManyToMany(() => Decks, (decks) => decks.cards)
  @JoinTable()
  public decks!: Promise<Decks[]>

}
