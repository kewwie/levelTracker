import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateGuild1706920291601 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "guild",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "guildId",
                        type: "varchar",
                        length: "255"
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
                        type: "boolean",
                        default: true
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("guild")
    }

}
