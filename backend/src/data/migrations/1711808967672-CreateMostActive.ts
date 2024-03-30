import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMostActive1711808967672 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "most_active",
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
                    },
                    {
                        name: "leaderboard",
                        type: 'varchar',
                    },
                    {
                        name: "type",
                        type: 'varchar',
                    },
                    {
                        name: "userId",
                        type: 'varchar',
                    },
                    {
                        name: "amount",
                        type: 'int',
                    }
                ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("most_active");
    }

}
