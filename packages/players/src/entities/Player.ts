import {
  Entity,
  Column,
  BaseEntity,
  PrimaryColumn,
} from 'typeorm'

@Entity()
export class Players extends BaseEntity {

  @PrimaryColumn()
  public id!: string

  @Column()
  public bal!: number

}
