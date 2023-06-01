import {MigrationInterface, QueryRunner} from 'typeorm';

export class Migration1685599793286 implements MigrationInterface {
  name = 'Migration1685599793286';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "session" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "place" character varying NOT NULL, "joinLimit" integer NOT NULL, "isParking" boolean NOT NULL, "isShuttle" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))'
    );
    await queryRunner.query(
      'CREATE TABLE "signup" ("id" character varying NOT NULL, "name" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "email" character varying NOT NULL, "joinNumber" integer NOT NULL, "isParking" boolean NOT NULL, "isShuttle" boolean NOT NULL, "isVerified" boolean NOT NULL, "isCheckin" boolean NOT NULL DEFAULT false, "sessionId" integer, CONSTRAINT "PK_ac9abc3369438f36bac2e0986e2" PRIMARY KEY ("id"))'
    );
    await queryRunner.query(
      'ALTER TABLE "signup" ADD CONSTRAINT "FK_3acbf36923a85a4c2a5d5cfaec7" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "signup" DROP CONSTRAINT "FK_3acbf36923a85a4c2a5d5cfaec7"'
    );
    await queryRunner.query('DROP TABLE "signup"');
    await queryRunner.query('DROP TABLE "session"');
  }
}
