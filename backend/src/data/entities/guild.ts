import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'guilds' })
export class Guild {
    @PrimaryColumn({ type: 'varchar', length: 255 })
    id: string; // Guild ID

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    iconUrl: string | null;

    @Column({ type: 'varchar', length: 100 })
    type: string;
    
    @Column({ type: 'varchar', length: 10, nullable: true })
    prefix: string | null;
}