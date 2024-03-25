import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMembers1706923039432 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "members",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "guildId",
                        type: "varchar",
                        length: "255"
                    },
                    {
                        name: "userId",
                        type: "varchar",
                        length: "255"
                    },
                    {
                        name: "username",
                        type: "varchar",
                        length: "255"
                    },
                    {
                        name: "discriminator",
                        type: "varchar",
                        length: "4",
                        isNullable: true
                    },
                    {
                        name: "tag",
                        type: "varchar",
                        length: "255"
                    },
                    {
                        name: "avatarUrl",
                        type: "varchar",
                        length: "255",
                        isNullable: true
                    },
                    {
                        name: "rank",
                        type: "int"
                    },
                    {
                        name: "level",
                        type: "int"
                    },
                    {
                        name: "xp",
                        type: "int"
                    },
                    {
                        name: "averageXp",
                        type: "int",
                        default: 0
                    },
                    {
                        name: "hourlyXp",
                        type: "int",
                        default: 0
                    },
                    {
                        name: "dailyXp",
                        type: "int",
                        default: 0
                    },
                    {
                        name: "weeklyXp",
                        type: "int",
                        default: 0
                    },
                    {
                        name: "monthlyXp",
                        type: "int",
                        default: 0
                    },
                    {
                        name: "messages",
                        type: "int"
                    },
                    {
                        name: "hourlyMsg",
                        type: "int",
                        default: 0
                    },
                    {
                        name: "dailyMsg",
                        type: "int",
                        default: 0
                    },
                    {
                        name: "weeklyMsg",
                        type: "int",
                        default: 0
                    },
                    {
                        name: "monthlyMsg",
                        type: "int",
                        default: 0
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("member");
    }

}
