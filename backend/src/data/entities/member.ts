import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'members' })
export class Member {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'bigint', unsigned: true })
    guildId: number;

    @Column({ type: 'bigint', unsigned: true })
    userId: number;

    @Column({ type: 'varchar', length: 255 })
    username: string;

    @Column({ type: 'varchar', length: 4, nullable: true })
    discriminator: string;

    @Column({ type: 'varchar', length: 255 })
    tag: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    avatarUrl: string;

    @Column({ type: 'int' })
    rank: number;

    @Column({ type: 'int' })
    level: number;

    @Column({ type: 'int' })
    xp: number;

    @Column({ type: 'int', default: 0 })
    averageXp: number;

    @Column({ type: 'int', default: 0 })
    hourlyXp: number;

    @Column({ type: 'int', default: 0 })
    dailyXp: number;

    @Column({ type: 'int', default: 0 })
    weeklyXp: number;

    @Column({ type: 'int', default: 0 })
    monthlyXp: number;

    @Column({ type: 'int' })
    messages: number;

    @Column({ type: 'int', default: 0 })
    hourlyMsg: number;

    @Column({ type: 'int', default: 0 })
    dailyMsg: number;

    @Column({ type: 'int', default: 0 })
    weeklyMsg: number;

    @Column({ type: 'int', default: 0 })
    monthlyMsg: number;
}