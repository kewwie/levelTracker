import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserCoins1711809551897 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user_coins",
                columns: [
                    {
                        name: "userId",
                        type: "varchar",
                        isPrimary: true,
                    },
                    {
                        name: "coins",
                        type: "int",
                    }
                ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user_coins");
    }

}
