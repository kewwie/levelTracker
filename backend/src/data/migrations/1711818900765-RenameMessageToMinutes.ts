import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameMessageToMinutes1711818900765 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn("members", "messages", "minutes")
        await queryRunner.renameColumn("members", "monthlyMsg", "monthlyMinutes");
        await queryRunner.renameColumn("members", "weeklyMsg", "weeklyMinutes");
        await queryRunner.renameColumn("members", "dailyMsg", "dailyMinutes");
        await queryRunner.renameColumn("members", "hourlyMsg", "hourlyMinutes");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn("members", "hourlyMinutes", "hourlyMsg");
        await queryRunner.renameColumn("members", "dailyMinutes", "dailyMsg");
        await queryRunner.renameColumn("members", "weeklyMinutes", "weeklyMsg");
        await queryRunner.renameColumn("members", "monthlyMinutes", "monthlyMsg");
        await queryRunner.renameColumn("members", "minutes", "messages");
    }
}
