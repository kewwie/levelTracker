import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity({ name: "user_coins" })
export class Coins {
    @PrimaryColumn({ type: "varchar" })
    userId: string;

    @Column({ type: "int" })
    coins: number;
}