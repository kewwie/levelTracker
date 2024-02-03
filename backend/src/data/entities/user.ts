import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Member {
    @PrimaryColumn()
    userId: string;

    @Column()
    username: string;

    @Column({ type: String, nullable: true })
    discriminator: string | null;

    @Column()
    tag: string;

    @Column({ type: String, nullable: true })
    avatarUrl: string | null;

    @Column({ type: Boolean, default: true })
    developer: Boolean = false;
}