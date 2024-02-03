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

    @Column({ type: Number, default: true })
    averageXp: number = 0;

    @Column({ type: Number, default: true })
    hourlyXp: number = 0;

    @Column({ type: Number, default: true })
    dailyXp: number = 0;
    
    @Column({ type: Number, default: true })
    weeklyXp: number = 0;

    @Column({ type: Number, default: true })
    monthlyXp: number = 0;

    @Column()
    messages: number

    @Column({ type: Number, default: true })
    hourlyMsg: number = 0;

    @Column({ type: Number, default: true })
    dailyMsg: number = 0;

    @Column({ type: Number, default: true })
    weeklyMsg: number = 0;

    @Column({ type: Number, default: true })
    monthlyMsg: number = 0;
}