import {
  Table,
  QueryRunner,
  MigrationInterface
} from 'typeorm'

const StatusTable = new Table({
  name: 'status',
  columns: [
    {
      name: 'id',
      isPrimary: true,
      type: 'increment',
      isNullable: false
    },
    {
      name: 'name',
      type: 'varchar',
      isNullable: false
    },
    {
      type: 'int',
      name: 'type',
      default: 0,
      isNullable: false
    }
  ]
})

export class StatusMigration implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(StatusTable)
  }

  public async down (queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('status')
  }
}
