/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { GuildData } from '../types/GuildData';
import { dataSource } from '../data/datasource';
import { Guild } from 'src/data/entities/Guild';

@Injectable()
export class GuildsService {

    async postGuilds(guildId: string, guildData: GuildData) { // Create Guild
        console.log("Create");
        let guildDb = await dataSource.getRepository(Guild);
        let guild = await guildDb.findOne({ where: { id: guildId } });

        guildData.id = guildId;

        if (guild) {
            return { "message": "Guild already exists" }
        } else {
            await guildDb.insert(guildData);
            console.log("Created")
            return { guildData };
        }
    }

    async patchGuilds(guildId: string, guildData: GuildData) { // Update Guild
        let guildDb = await dataSource.getRepository(Guild);
        let guild = await guildDb.findOne({ where: { id: guildId } });

        guildData.id = guildId;

        if (guild) {
            await guildDb.update(guildId, guildData);
            return { guildData };
        } else {
            return { "message": "Guild not found" }
        }
    }

    async deleteGuilds(guildId: string) { // Delete Guild
        let guildDb = await dataSource.getRepository(Guild);
        let guild = await guildDb.findOne({ where: { id: guildId } });

        if (guild) {
            await guildDb.delete(guildId)
            return { "message": "Guild deleted" }
        } else {
            return { "message": "Guild not found" }
        }
    }

}
