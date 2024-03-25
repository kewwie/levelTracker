import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateGuilds1706920291601 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'guilds',
                columns: [
                {
                    name: 'id', // Guild ID
                    type: 'bigint',
                    unsigned: true,
                    isPrimary: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'iconUrl',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'type',
                    type: 'varchar',
                    length: '100',
                },
                {
                    name: 'prefix',
                    type: 'varchar',
                    length: '10',
                    isNullable: true,
                },
                ],
            }),
        );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('guild');
  }
}
