import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class MostActive {
    @PrimaryColumn()
    guildId: string;

    @Column()
    type: string;

    @Column()
    userId: string;
}