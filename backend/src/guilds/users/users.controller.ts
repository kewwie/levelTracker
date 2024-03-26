/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller({ path: "/guilds/:guildId/users/:userId", version: '1'})
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    getUser(@Param('guildId') guildId: string, @Param('userId') userId: string) {
        return this.usersService.getUser(guildId, userId);
    }
}
