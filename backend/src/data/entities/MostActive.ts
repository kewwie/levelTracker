import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MostActive {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    guildId: string;

    @Column({ type: "varchar" })
    leaderboard: string;

    @Column({ type: "varchar" })
    type: string;

    @Column({ type: "varchar" })
    userId: string;

    @Column({ type: "int" })
    amount: number;
}