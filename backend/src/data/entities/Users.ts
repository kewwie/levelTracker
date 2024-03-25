import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
    @PrimaryColumn({ type: 'varchar', length: 255, unsigned: true })
    id: string; // User ID

    @Column({ type: 'varchar', length: 255 })
    username: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    discriminator: string;

    @Column({ type: 'varchar', length: 255 })
    tag: string;

    @Column({ type: 'varchar', length: 255 })
    avatarUrl: string;

    @Column({ type: 'tinyint', unsigned: true, default: 0 })
    developer: number;
}