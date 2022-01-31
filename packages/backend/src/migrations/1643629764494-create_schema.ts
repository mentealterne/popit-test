import { MigrationInterface, QueryRunner } from 'typeorm';

export class createSchema1643629764494 implements MigrationInterface {
  name = 'createSchema1643629764494';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "story" ("id" SERIAL NOT NULL, "ig_id" character varying NOT NULL, "views" bigint NOT NULL, "swipes" bigint NOT NULL, "clicks" bigint NOT NULL, "postedAt" date NOT NULL, "campaignId" integer, CONSTRAINT "PK_28fce6873d61e2cace70a0f3361" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "campaign" ("id" SERIAL NOT NULL, "company" character varying NOT NULL, "open" boolean NOT NULL DEFAULT false, "createdAt" date NOT NULL, CONSTRAINT "UQ_85cde4913ea96424b1b8948bcea" UNIQUE ("company"), CONSTRAINT "PK_0ce34d26e7f2eb316a3a592cdc4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "story" ADD CONSTRAINT "FK_b37375cad4a29c79bc1f9184481" FOREIGN KEY ("campaignId") REFERENCES "campaign"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "story" DROP CONSTRAINT "FK_b37375cad4a29c79bc1f9184481"`,
    );
    await queryRunner.query(`DROP TABLE "campaign"`);
    await queryRunner.query(`DROP TABLE "story"`);
  }
}
