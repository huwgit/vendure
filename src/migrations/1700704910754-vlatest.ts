import {MigrationInterface, QueryRunner} from "typeorm";

export class vlatest1700704910754 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_d101dc2265a7341be3d94968c5"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_facet_value" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "code" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "facetId" integer, CONSTRAINT "FK_d101dc2265a7341be3d94968c5b" FOREIGN KEY ("facetId") REFERENCES "facet" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_facet_value"("createdAt", "updatedAt", "code", "id", "facetId") SELECT "createdAt", "updatedAt", "code", "id", "facetId" FROM "facet_value"`, undefined);
        await queryRunner.query(`DROP TABLE "facet_value"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_facet_value" RENAME TO "facet_value"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_d101dc2265a7341be3d94968c5" ON "facet_value" ("facetId") `, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_promotion" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "startsAt" datetime, "endsAt" datetime, "couponCode" varchar, "perCustomerUsageLimit" integer, "enabled" boolean NOT NULL, "conditions" text NOT NULL, "actions" text NOT NULL, "priorityScore" integer NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "usageLimit" integer)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_promotion"("createdAt", "updatedAt", "deletedAt", "startsAt", "endsAt", "couponCode", "perCustomerUsageLimit", "enabled", "conditions", "actions", "priorityScore", "id") SELECT "createdAt", "updatedAt", "deletedAt", "startsAt", "endsAt", "couponCode", "perCustomerUsageLimit", "enabled", "conditions", "actions", "priorityScore", "id" FROM "promotion"`, undefined);
        await queryRunner.query(`DROP TABLE "promotion"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_promotion" RENAME TO "promotion"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_d101dc2265a7341be3d94968c5"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_facet_value" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "code" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "facetId" integer)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_facet_value"("createdAt", "updatedAt", "code", "id", "facetId") SELECT "createdAt", "updatedAt", "code", "id", "facetId" FROM "facet_value"`, undefined);
        await queryRunner.query(`DROP TABLE "facet_value"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_facet_value" RENAME TO "facet_value"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_d101dc2265a7341be3d94968c5" ON "facet_value" ("facetId") `, undefined);
        await queryRunner.query(`DROP INDEX "IDX_d101dc2265a7341be3d94968c5"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_facet_value" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "code" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "facetId" integer NOT NULL)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_facet_value"("createdAt", "updatedAt", "code", "id", "facetId") SELECT "createdAt", "updatedAt", "code", "id", "facetId" FROM "facet_value"`, undefined);
        await queryRunner.query(`DROP TABLE "facet_value"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_facet_value" RENAME TO "facet_value"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_d101dc2265a7341be3d94968c5" ON "facet_value" ("facetId") `, undefined);
        await queryRunner.query(`DROP INDEX "IDX_d101dc2265a7341be3d94968c5"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_facet_value" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "code" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "facetId" integer NOT NULL, CONSTRAINT "FK_d101dc2265a7341be3d94968c5b" FOREIGN KEY ("facetId") REFERENCES "facet" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_facet_value"("createdAt", "updatedAt", "code", "id", "facetId") SELECT "createdAt", "updatedAt", "code", "id", "facetId" FROM "facet_value"`, undefined);
        await queryRunner.query(`DROP TABLE "facet_value"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_facet_value" RENAME TO "facet_value"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_d101dc2265a7341be3d94968c5" ON "facet_value" ("facetId") `, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_d101dc2265a7341be3d94968c5"`, undefined);
        await queryRunner.query(`ALTER TABLE "facet_value" RENAME TO "temporary_facet_value"`, undefined);
        await queryRunner.query(`CREATE TABLE "facet_value" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "code" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "facetId" integer NOT NULL)`, undefined);
        await queryRunner.query(`INSERT INTO "facet_value"("createdAt", "updatedAt", "code", "id", "facetId") SELECT "createdAt", "updatedAt", "code", "id", "facetId" FROM "temporary_facet_value"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_facet_value"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_d101dc2265a7341be3d94968c5" ON "facet_value" ("facetId") `, undefined);
        await queryRunner.query(`DROP INDEX "IDX_d101dc2265a7341be3d94968c5"`, undefined);
        await queryRunner.query(`ALTER TABLE "facet_value" RENAME TO "temporary_facet_value"`, undefined);
        await queryRunner.query(`CREATE TABLE "facet_value" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "code" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "facetId" integer)`, undefined);
        await queryRunner.query(`INSERT INTO "facet_value"("createdAt", "updatedAt", "code", "id", "facetId") SELECT "createdAt", "updatedAt", "code", "id", "facetId" FROM "temporary_facet_value"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_facet_value"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_d101dc2265a7341be3d94968c5" ON "facet_value" ("facetId") `, undefined);
        await queryRunner.query(`DROP INDEX "IDX_d101dc2265a7341be3d94968c5"`, undefined);
        await queryRunner.query(`ALTER TABLE "facet_value" RENAME TO "temporary_facet_value"`, undefined);
        await queryRunner.query(`CREATE TABLE "facet_value" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "code" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "facetId" integer, CONSTRAINT "FK_d101dc2265a7341be3d94968c5b" FOREIGN KEY ("facetId") REFERENCES "facet" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "facet_value"("createdAt", "updatedAt", "code", "id", "facetId") SELECT "createdAt", "updatedAt", "code", "id", "facetId" FROM "temporary_facet_value"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_facet_value"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_d101dc2265a7341be3d94968c5" ON "facet_value" ("facetId") `, undefined);
        await queryRunner.query(`ALTER TABLE "promotion" RENAME TO "temporary_promotion"`, undefined);
        await queryRunner.query(`CREATE TABLE "promotion" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "startsAt" datetime, "endsAt" datetime, "couponCode" varchar, "perCustomerUsageLimit" integer, "enabled" boolean NOT NULL, "conditions" text NOT NULL, "actions" text NOT NULL, "priorityScore" integer NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`, undefined);
        await queryRunner.query(`INSERT INTO "promotion"("createdAt", "updatedAt", "deletedAt", "startsAt", "endsAt", "couponCode", "perCustomerUsageLimit", "enabled", "conditions", "actions", "priorityScore", "id") SELECT "createdAt", "updatedAt", "deletedAt", "startsAt", "endsAt", "couponCode", "perCustomerUsageLimit", "enabled", "conditions", "actions", "priorityScore", "id" FROM "temporary_promotion"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_promotion"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_d101dc2265a7341be3d94968c5"`, undefined);
        await queryRunner.query(`ALTER TABLE "facet_value" RENAME TO "temporary_facet_value"`, undefined);
        await queryRunner.query(`CREATE TABLE "facet_value" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "code" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "facetId" integer, CONSTRAINT "FK_d101dc2265a7341be3d94968c5b" FOREIGN KEY ("facetId") REFERENCES "facet" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "facet_value"("createdAt", "updatedAt", "code", "id", "facetId") SELECT "createdAt", "updatedAt", "code", "id", "facetId" FROM "temporary_facet_value"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_facet_value"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_d101dc2265a7341be3d94968c5" ON "facet_value" ("facetId") `, undefined);
   }

}
