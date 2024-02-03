import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class GuildEntity {
    @PrimaryColumn()
    guildId: number;

    @Column()
    name: string;

    @Column({ type: String, nullable: true })
    iconUrl: string | null;

    @Column()
    type: string;
    
    @Column()
    active: boolean;

    @Column()
    prefix: string;
}