import {
  MigrationInterface,
  QueryRunner,
} from 'typeorm'

export class Initial1599148770329 implements MigrationInterface {

    public name = 'Initial1599148770329'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        CREATE TABLE "players" (
        "id" character varying NOT NULL,
        "bal" integer NOT NULL,
        CONSTRAINT "PK_de22b8fdeee0c33ab55ae71da3b" PRIMARY KEY ("id"))`,
      )
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP TABLE "players"')
    }

}
