/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, Query, Patch, Post } from '@nestjs/common';
import { GuildsService } from './guilds.service';
import { GuildData } from '../types/GuildData';

@Controller({ path: 'guilds', version: '1' })
export class GuildsController {
    constructor(private guildsService: GuildsService) {}

    @Get() // GET /guilds
    getAllGuilds() {
        return this.guildsService.getAllGuilds();
    }

    @Post("/:guildId") // POST /guilds/:guildId
    postGuilds(@Param('guildId') guildId: string, @Body() guildData: GuildData) {
        return this.guildsService.postGuilds(guildId, guildData);
    }

    @Patch("/:guildId") // PATCH /guilds/:guildId
    patchGuilds(@Param('guildId') guildId: string, @Body() guildData: GuildData) {
        return this.guildsService.patchGuilds(guildId, guildData);
    }

    @Delete("/:guildId") // DELETE /guilds/:guildId
    deleteGuilds(@Param('guildId') guildId: string) {
        return this.guildsService.deleteGuilds(guildId);
    }
    
    @Get("/:guildId/leaderboard/:time/:type") // GET /guilds/:guildId/leaderboard/:time/:type?page=0&amount=100
    getLeaderboard(
        @Param('guildId') guildId: string,
        @Param('time') time: string,
        @Param('type') type: string,
        @Query('page') page: number,
        @Query('amount') amount: number
    ) {
        switch(time) {
            case "hourly": {
                return this.guildsService.getHourlyLeaderboard(guildId, type, amount, page);
            }
            case "daily": {
                return this.guildsService.getDailyLeaderboard(guildId, type, amount, page);
            }
            case "weekly": {
                return this.guildsService.getWeeklyLeaderboard(guildId, type, amount, page);
            }
            case "monthly": {
                return this.guildsService.getMonthlyLeaderboard(guildId, type, amount, page);
            }
        }
    }
}
