import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Member {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: "255" })
    guildId: string;

    @Column({ type: "varchar", length: "255" })
    name: string;

    @Column({ type: "varchar", length: "255", nullable: true })
    iconUrl: string | null;

    @Column({ type: "varchar", length: "50"})
    type: string;
    
    @Column({ type: Boolean, default: true })
    active: boolean = true;
}