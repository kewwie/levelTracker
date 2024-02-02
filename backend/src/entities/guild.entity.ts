import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Member {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    guildId: string;

    @Column()
    name: string;

    @Column({ type: String, nullable: true })
    iconUrl: string | null;

    @Column()
    type: string;
    
    @Column()
    active: boolean;
}