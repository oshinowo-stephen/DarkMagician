import {
  Table,
  QueryRunner,
  MigrationInterface
} from 'typeorm'

const GuildTable = new Table({
  name: 'guild',
  columns: [
    {
      name: 'id',
      type: 'varchar',
      isPrimary: true,
      isNullable: false
    },
    {
      name: 'prefix',
      type: 'varchar'
    },
    {
      name: 'vip',
      type: 'varchar'
    }
  ]
})

export class GuildMigration implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(GuildTable)
  }

  public async down (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('guild')
  }
}
