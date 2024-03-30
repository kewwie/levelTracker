import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MostActive {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    guildId: string;

    @Column()
    type: string;

    @Column()
    userId: string;
}