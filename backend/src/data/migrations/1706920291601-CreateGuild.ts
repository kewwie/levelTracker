import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateGuild1706920291601 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "guild",
                columns: [
                    {
                        name: "guildId",
                        type: "bigint",
                        unsigned: true,
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "255"
                    },
                    {
                        name: "iconUrl",
                        type: "varchar",
                        length: "255",
                        isNullable: true
                    },
                    {
                        name: "type",
                        type: "varchar",
                        length: "100"
                    },
                    {
                        name: "active",
                        type: "tinyint",
                        unsigned: true,
                        default: 1,
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("guild")
    }

}
