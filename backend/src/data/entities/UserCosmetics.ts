import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("user_cosmetics")
export class UserCosmetics {
    @PrimaryColumn({ type: "varchar" })
    userId: string;

    @Column({ type: "varchar" })
    cosmeticId: string;

    @Column({ type: "varchar" })
    type: string;

    @Column({ type: "timestamp", nullable: true })
    expires: Date;
}