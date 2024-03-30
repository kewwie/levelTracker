import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMostActive1711808967672 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "most_active",
                columns: [
                    {
                        name: "guildId",
                        type: "varchar",
                        isPrimary: true,
                    },

                    {
                        name: "type",
                        type: 'varchar',
                    },
                    {
                        name: "userId",
                        type: 'varchar',
                    }
                ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("most_active");
    }

}
