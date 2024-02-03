import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Member {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    guildId: string;

    @Column()
    userId: string;

    @Column()
    username: string;

    @Column({ type: String, nullable: true })
    discriminator: string | null;

    @Column()
    tag: string;

    @Column({ type: String, nullable: true })
    avatarUrl: string | null;

    @Column()
    rank: number;

    @Column()
    level: number;

    @Column()
    xp: number;

    @Column()
    averageXp: number;

    @Column()
    hourlyXp: number;

    @Column()
    dailyXp: number;
    
    @Column()
    weeklyXp: number;

    @Column()
    monthlyXp: number;

    @Column()
    messages: number

    @Column()
    hourlyMsg: number;

    @Column()
    dailyMsg: number;

    @Column()
    weeklyMsg: number;

    @Column()
    monthlyMsg: number;
}