import { Repository } from "typeorm";
import { dataSource } from "./datasource";
import { GuildEntity } from "./entities/guild";


export class GuildSettings {
    private guild: Repository<GuildEntity>;

    constructor() {
        this.guild = dataSource.getRepository(GuildEntity);
    }

    async addGuild(data) {
        return this.guild.insert(data);
    }
}