import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Member {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
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