import {
  Entity,
  Column,
  OneToMany,
  PrimaryColumn,
} from 'typeorm'

import { Cards } from './Cards'
import { Decks } from './Decks'

@Entity()
export class Player {

  @PrimaryColumn()
  public id!: string

  @Column()
  public bal!: number

  @OneToMany(() => Cards, (cards) => cards.player)
  public cards!: Promise<Cards[]>

  @OneToMany(() => Decks, (decks) => decks.player)
  public decks!: Promise<Decks[]>

}
