import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1706921675343 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                {
                    name: 'userId',
                    type: 'bigint',
                    unsigned: true,
                    isPrimary: true,
                },
                {
                    name: 'username',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'discriminator',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'tag',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'avatarUrl',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'developer',
                    type: 'tinyint',
                    unsigned: true,
                    default: 0,
                },
                ],
            }),
        );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
