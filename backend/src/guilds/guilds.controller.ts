/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Post } from '@nestjs/common';
import { GuildsService } from './guilds.service';

@Controller({ path: 'guilds/:guildId', version: '1' })
export class GuildsController {
    constructor(private guildsService: GuildsService) {}

    @Post() // POST /guilds/:guildId
    postGuilds() {
        // Add middleware to check if user is developer
        this.guildsService.postGuilds();
    }
}
