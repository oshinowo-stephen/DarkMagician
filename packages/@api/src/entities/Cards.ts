import {
  Entity,
  JoinTable,
  ManyToOne,
  ManyToMany,
  PrimaryColumn,
} from 'typeorm'

import { Decks } from './Decks'
import { Player } from './Player'

@Entity()
export class Cards {

  @PrimaryColumn()
  public readonly id!: number

  @ManyToMany(() => Decks, (decks) => decks.cards)
  @JoinTable()
  public decks!: Promise<Decks[]>

  @ManyToOne(() => Player, (player) => player.cards)
  public player!: Player

}
