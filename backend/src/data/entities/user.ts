import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryColumn()
    userId: number;

    @Column()
    username: string;

    @Column({ type: String, nullable: true })
    discriminator: string | null;

    @Column()
    tag: string;

    @Column({ type: String, nullable: true })
    avatarUrl: string | null;

    @Column()
    developer: Boolean;
}