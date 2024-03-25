/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { GuildData } from '../types/GuildData';
import { dataSource } from '../data/datasource';
import { Guild } from 'src/data/entities/Guild';

@Injectable()
export class GuildsService {

    async postGuilds(guildData: GuildData) { // Create Guild
        let guildDb = await dataSource.getRepository(Guild);
        let guild = await guildDb.findOne({ where: { id: guildData.id } });

        if (guild) {
            return { "message": "Guild already exists" }
        } else {
            await guildDb.insert(guildData);
            return { guildData }
        }
    }

    async patchGuilds(guildData: GuildData) { // Update Guild
        let guildDb = await dataSource.getRepository(Guild);
        let guild = await guildDb.findOne({ where: { id: guildData.id } });

        if (guild) {
            await guildDb.update(guildData.id, guildData);
        } else {
            return { "message": "Guild not found" }
        }
    }

    async deleteGuilds(guildId: number) { // Delete Guild
        let guildDb = await dataSource.getRepository(Guild);
        let guild = await guildDb.findOne({ where: { id: guildId } });

        if (guild) {
            await guildDb.delete(guildId)
        } else {
            return { "message": "Guild not found" }
        }
    }

}
