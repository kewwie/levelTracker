import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserCosmetics1711809188980 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user_cosmetics",
                columns: [
                    {
                        name: "userId",
                        type: "varchar",
                        isPrimary: true,
                    },
                    {
                        name: "cosmeticId",
                        type: "varchar",
                    },
                    {
                        name: "type",
                        type: "varchar",
                    },
                    {
                        name: "expires",
                        type: "timestamp",
                        isNullable: true,
                    }
                ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user_cosmetics");
    }

}
