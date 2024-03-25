/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { GuildsService } from './guilds.service';
import { GuildData } from '../types/GuildData';

@Controller({ path: 'guilds/:guildId', version: '1' })
export class GuildsController {
    constructor(private guildsService: GuildsService) {}

    @Post() // POST /guilds/:guildId
    postGuilds(@Param('guildId') guildId: number, @Body() guildData: GuildData) {
        return this.guildsService.postGuilds(guildId, guildData);
    }

    @Patch() // PATCH /guilds/:guildId
    patchGuilds(@Param('guildId') guildId: number, @Body() guildData: GuildData) {
        return this.guildsService.patchGuilds(guildId, guildData);
    }

    @Delete() // DELETE /guilds/:guildId
    deleteGuilds(@Param('guildId') guildId: number) {
        return this.guildsService.deleteGuilds(guildId);
    }
}
