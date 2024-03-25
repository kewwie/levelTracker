import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateLogins1711387318237 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "logins",
                columns: [
                    {
                        name: "id", // User ID
                        type: 'varchar',
                        length: '255',
                        unsigned: true,
                        isPrimary: true
                    },
                    {
                        name: "token",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "token_type",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "access_token",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "expires",
                        type: "datetime",
                    },
                    { 
                        name: "refresh_token",
                        type: "varchar",
                        length: "255",
                    },
                    
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("logins");
    }

}
