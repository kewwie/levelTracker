import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameMessageToMinutes1711818900765 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE members RENAME COLUMN messages TO minutes");
        await queryRunner.query("ALTER TABLE members RENAME COLUMN monthlyMsg TO monthlyMinutes");
        await queryRunner.query("ALTER TABLE members RENAME COLUMN weeklyMsg TO weeklyMinutes");
        await queryRunner.query("ALTER TABLE members RENAME COLUMN dailyMsg TO dailyMinutes");
        await queryRunner.query("ALTER TABLE members RENAME COLUMN hourlyMsg TO hourlyMinutes");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE members RENAME COLUMN minutes TO messages");
        await queryRunner.query("ALTER TABLE members RENAME COLUMN monthlyMinutes TO monthlyMsg");
        await queryRunner.query("ALTER TABLE members RENAME COLUMN weeklyMinutes TO weeklyMsg");
        await queryRunner.query("ALTER TABLE members RENAME COLUMN dailyMinutes TO dailyMsg");
        await queryRunner.query("ALTER TABLE members RENAME COLUMN hourlyMinutes TO hourlyMsg");
    }

}
