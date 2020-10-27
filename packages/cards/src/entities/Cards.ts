import {
  Entity,
  Column,
  BaseEntity,
  PrimaryColumn,
} from 'typeorm'

@Entity()
export class Cards extends BaseEntity {

  @PrimaryColumn()
  public user!: string

  @Column()
  public card!: string

}
