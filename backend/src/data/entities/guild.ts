import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'guilds' })
export class Guild {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    guildId: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    iconUrl: string | null;

    @Column({ type: 'varchar', length: 100 })
    type: string;

    @Column({ type: 'tinyint', unsigned: true, default: 1 })
    active: number;

    @Column({ type: 'varchar', length: 10, nullable: true })
    prefix: string | null;
}