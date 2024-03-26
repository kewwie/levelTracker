/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { GuildData } from '../types/GuildData';
import { dataSource } from '../data/datasource';
import { Guild } from '../data/entities/Guild';
import { Member } from '../data/entities/Member';

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

    async getHourlyLeaderboard(guildId: string, type: string) {
        let membersDb = await dataSource.getRepository(Member);
        switch(type) {
            case "xp": {
                var members = await membersDb.find({ where: { guildId }, order: { hourlyXp: "DESC"} });
            }

            case "msg": {
                var members = await membersDb.find({ where: { guildId }, order: { hourlyMsg: "DESC"} });
            }
        }

        if (members) {
            return { members };
        } else {
            return { "message": "Members not found" };
        }
    }

    async getDailyLeaderboard(guildId: string, type: string) {
        let membersDb = await dataSource.getRepository(Member);
        switch(type) {
            case "xp": {
                var members = await membersDb.find({ where: { guildId }, order: { dailyXp: "DESC"} });
            }

            case "msg": {
                var members = await membersDb.find({ where: { guildId }, order: { dailyMsg: "DESC"} });
            }
        }

        if (members) {
            return { members };
        } else {
            return { "message": "Members not found" };
        }
    }

    async getWeeklyLeaderboard(guildId: string, type: string) {
        let membersDb = await dataSource.getRepository(Member);
        switch(type) {
            case "xp": {
                var members = await membersDb.find({ where: { guildId }, order: { weeklyXp: "DESC"} });
            }

            case "msg": {
                var members = await membersDb.find({ where: { guildId }, order: { weeklyMsg: "DESC"} });
            }
        }

        if (members) {
            return { members };
        } else {
            return { "message": "Members not found" };
        }
    }

    async getMonthlyLeaderboard(guildId: string, type: string) {
        let membersDb = await dataSource.getRepository(Member);
        switch(type) {
            case "xp": {
                var members = await membersDb.find({ where: { guildId }, order: { monthlyXp: "DESC"} });
            }

            case "msg": {
                var members = await membersDb.find({ where: { guildId }, order: { monthlyMsg: "DESC"} });
            }
        }

        if (members) {
            return { members };
        } else {
            return { "message": "Members not found" };
        }
    }
}
