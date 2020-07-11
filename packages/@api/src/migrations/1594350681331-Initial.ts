/* eslint-disable max-len */

import {
  MigrationInterface,
  QueryRunner,
} from 'typeorm'

export class Initial1594350681331 implements MigrationInterface {

  public readonly name = 'Initial1594350681331'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "player" ("id" character varying NOT NULL, "bal" integer NOT NULL, CONSTRAINT "PK_65edadc946a7faf4b638d5e8885" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "decks" ("id" character varying NOT NULL, "name" character varying NOT NULL, "playerId" character varying, CONSTRAINT "PK_981894e3f8dbe5049ac59cb1af1" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "cards" ("id" integer NOT NULL, "playerId" character varying, CONSTRAINT "PK_5f3269634705fdff4a9935860fc" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "decks_cards_cards" ("decksId" character varying NOT NULL, "cardsId" integer NOT NULL, CONSTRAINT "PK_2e62fc81e72369da5b28ce2c199" PRIMARY KEY ("decksId", "cardsId"))')
    await queryRunner.query('CREATE INDEX "IDX_73bc78c95062bc6f8980ffc083" ON "decks_cards_cards" ("decksId") ')
    await queryRunner.query('CREATE INDEX "IDX_6aff5e82cd8d5501fb5d463dbe" ON "decks_cards_cards" ("cardsId") ')
    await queryRunner.query('CREATE TABLE "cards_decks_decks" ("cardsId" integer NOT NULL, "decksId" character varying NOT NULL, CONSTRAINT "PK_49e2b64dcd6d3f71dc0f5c1ab4b" PRIMARY KEY ("cardsId", "decksId"))')
    await queryRunner.query('CREATE INDEX "IDX_38f27db265da90f0374a6a0049" ON "cards_decks_decks" ("cardsId") ')
    await queryRunner.query('CREATE INDEX "IDX_047f284303d8b31216149a6924" ON "cards_decks_decks" ("decksId") ')
    await queryRunner.query('ALTER TABLE "decks" ADD CONSTRAINT "FK_8df616907ae0caf36b5ac866d76" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "cards" ADD CONSTRAINT "FK_77cc52eaa57ba2bcfad4561769b" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "decks_cards_cards" ADD CONSTRAINT "FK_73bc78c95062bc6f8980ffc083c" FOREIGN KEY ("decksId") REFERENCES "decks"("id") ON DELETE CASCADE ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "decks_cards_cards" ADD CONSTRAINT "FK_6aff5e82cd8d5501fb5d463dbe4" FOREIGN KEY ("cardsId") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "cards_decks_decks" ADD CONSTRAINT "FK_38f27db265da90f0374a6a00499" FOREIGN KEY ("cardsId") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE NO ACTION')
    await queryRunner.query('ALTER TABLE "cards_decks_decks" ADD CONSTRAINT "FK_047f284303d8b31216149a6924b" FOREIGN KEY ("decksId") REFERENCES "decks"("id") ON DELETE CASCADE ON UPDATE NO ACTION')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "cards_decks_decks" DROP CONSTRAINT "FK_047f284303d8b31216149a6924b"')
    await queryRunner.query('ALTER TABLE "cards_decks_decks" DROP CONSTRAINT "FK_38f27db265da90f0374a6a00499"')
    await queryRunner.query('ALTER TABLE "decks_cards_cards" DROP CONSTRAINT "FK_6aff5e82cd8d5501fb5d463dbe4"')
    await queryRunner.query('ALTER TABLE "decks_cards_cards" DROP CONSTRAINT "FK_73bc78c95062bc6f8980ffc083c"')
    await queryRunner.query('ALTER TABLE "cards" DROP CONSTRAINT "FK_77cc52eaa57ba2bcfad4561769b"')
    await queryRunner.query('ALTER TABLE "decks" DROP CONSTRAINT "FK_8df616907ae0caf36b5ac866d76"')
    await queryRunner.query('DROP INDEX "IDX_047f284303d8b31216149a6924"')
    await queryRunner.query('DROP INDEX "IDX_38f27db265da90f0374a6a0049"')
    await queryRunner.query('DROP TABLE "cards_decks_decks"')
    await queryRunner.query('DROP INDEX "IDX_6aff5e82cd8d5501fb5d463dbe"')
    await queryRunner.query('DROP INDEX "IDX_73bc78c95062bc6f8980ffc083"')
    await queryRunner.query('DROP TABLE "decks_cards_cards"')
    await queryRunner.query('DROP TABLE "cards"')
    await queryRunner.query('DROP TABLE "decks"')
    await queryRunner.query('DROP TABLE "player"')
  }

}
