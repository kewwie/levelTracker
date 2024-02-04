import { Column, MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddPrefixToGuild1706990683152 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("guild", 
            new TableColumn({
                name: "prefix",
                type: "varchar",
                length: "10",
                isNullable: true
            }),
            
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("guild", "prefix");
    }

}
