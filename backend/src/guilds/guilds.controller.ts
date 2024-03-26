/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { GuildsService } from './guilds.service';
import { GuildData } from '../types/GuildData';

@Controller({ path: 'guilds/:guildId', version: '1' })
export class GuildsController {
    constructor(private guildsService: GuildsService) {}

    @Post() // POST /guilds/:guildId
    postGuilds(@Param('guildId') guildId: string, @Body() guildData: GuildData) {
        return this.guildsService.postGuilds(guildId, guildData);
    }

    @Patch() // PATCH /guilds/:guildId
    patchGuilds(@Param('guildId') guildId: string, @Body() guildData: GuildData) {
        return this.guildsService.patchGuilds(guildId, guildData);
    }

    @Delete() // DELETE /guilds/:guildId
    deleteGuilds(@Param('guildId') guildId: string) {
        return this.guildsService.deleteGuilds(guildId);
    }
    
    @Get("/leaderboard/:time/:type") // GET /guilds/:guildId/leaderboard/:time/:type
    getLeaderboard(@Param('guildId') guildId: string, @Param('time') time: string, @Param('type') type: string) {
        switch(time) {
            case "hourly": {
                return this.guildsService.getHourlyLeaderboard(guildId, type);
            }
            case "daily": {
                return this.guildsService.getDailyLeaderboard(guildId, type);
            }
            case "weekly": {
                return this.guildsService.getWeeklyLeaderboard(guildId, type);
            }
            case "monthly": {
                return this.guildsService.getMonthlyLeaderboard(guildId, type);
            }
        }
    }
}
