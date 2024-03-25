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
    postGuilds(@Body() guildData: GuildData) {
        this.guildsService.postGuilds(guildData);
    }

    @Patch() // PATCH /guilds/:guildId
    patchGuilds(@Body() guildData: GuildData) {
        this.guildsService.patchGuilds(guildData);
    }

    @Delete() // DELETE /guilds/:guildId
    deleteGuilds(@Param('guildId') guildId: number) {
        this.guildsService.deleteGuilds(guildId);
    }
}
