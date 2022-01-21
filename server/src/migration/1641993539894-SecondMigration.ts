import {MigrationInterface, QueryRunner} from "typeorm";

export class SecondMigration1641993539894 implements MigrationInterface {
    name = 'SecondMigration1641993539894'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vote" ("userId" integer NOT NULL, "postId" integer NOT NULL, "point" integer NOT NULL, CONSTRAINT "PK_16e301aa5efdd994626b2635186" PRIMARY KEY ("userId", "postId"))`);
        await queryRunner.query(`CREATE TABLE "community" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, "imageUrl" text, "description" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_696fdadbf0a710efbbf9d98ad9f" UNIQUE ("name"), CONSTRAINT "UQ_78f0ffecc9a866f40ef12da2f23" UNIQUE ("imageUrl"), CONSTRAINT "PK_cae794115a383328e8923de4193" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying(30) NOT NULL, "email" character varying NOT NULL, "imageUrl" text, "password" character varying NOT NULL, "isConfirmed" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_7702daaa8e3b4f2d0b32601c9b2" UNIQUE ("imageUrl"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "body" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "creatorId" integer NOT NULL, "communityId" integer, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "body" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, "postId" integer NOT NULL, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_communities_community" ("userId" integer NOT NULL, "communityId" integer NOT NULL, CONSTRAINT "PK_6368016a7df4f4261c80cd54b89" PRIMARY KEY ("userId", "communityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b4e18e70486964dce0b5df55eb" ON "user_communities_community" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5f4039bc59f09b637582f1614b" ON "user_communities_community" ("communityId") `);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_43cc1af57676ac1b7ec774bd10f" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_f5de237a438d298031d11a57c3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_9e91e6a24261b66f53971d3f96b" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_94a85bb16d24033a2afdd5df060" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_communities_community" ADD CONSTRAINT "FK_b4e18e70486964dce0b5df55eb5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_communities_community" ADD CONSTRAINT "FK_5f4039bc59f09b637582f1614b1" FOREIGN KEY ("communityId") REFERENCES "community"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_communities_community" DROP CONSTRAINT "FK_5f4039bc59f09b637582f1614b1"`);
        await queryRunner.query(`ALTER TABLE "user_communities_community" DROP CONSTRAINT "FK_b4e18e70486964dce0b5df55eb5"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_94a85bb16d24033a2afdd5df060"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_9e91e6a24261b66f53971d3f96b"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_f5de237a438d298031d11a57c3b"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_43cc1af57676ac1b7ec774bd10f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5f4039bc59f09b637582f1614b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b4e18e70486964dce0b5df55eb"`);
        await queryRunner.query(`DROP TABLE "user_communities_community"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "community"`);
        await queryRunner.query(`DROP TABLE "vote"`);
    }

}
