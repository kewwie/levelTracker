import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Member {
    @PrimaryColumn()
    guildId: string;

    @Column()
    name: string;

    @Column({ type: String, nullable: true })
    iconUrl: string | null;

    @Column()
    type: string;
    
    @Column({ type: Boolean, default: true })
    active: boolean = true;
}