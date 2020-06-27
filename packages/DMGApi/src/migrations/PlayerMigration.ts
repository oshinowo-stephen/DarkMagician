import {
  Table,
  QueryRunner,
  MigrationInterface
} from 'typeorm'

export const PlayerTable = new Table({
  name: 'player',
  columns: [
    {
      name: 'id',
      type: 'varchar',
      isNullable: false,
      isPrimary: true
    },
    {
      name: 'currency',
      type: 'int',
      isNullable: false,
    },
    {
      type: 'int',
      name: 'cards',
      isArray: true,
      isNullable: false,
    },
    {
      name: 'decks',
      isArray: true,
      type: 'varchar',
      isNullable: false
    }
  ]
})

export class PlayerMigration implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(PlayerTable, true)
  }

  public async down (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('player')
  }
}
