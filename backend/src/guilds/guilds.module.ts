/*
https://docs.nestjs.com/modules
*/

import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { GuildsController } from './guilds.controller';
import { GuildsService } from './guilds.service';
import { UsersModule } from './users/users.module';

// GET = Read
// POST = Create
// PATCH = Modify
// PUT = Replace
// DELETE = Delete

@Module({
  imports: [UsersModule],
  controllers: [GuildsController],
  providers: [GuildsService],
})
export class GuildsModule implements NestModule {
        configure(consumer: MiddlewareConsumer) {
            consumer.apply().forRoutes(
                { path: '/guilds', method: RequestMethod.POST },
                { path: '/guilds', method: RequestMethod.PATCH },
                { path: '/guilds', method: RequestMethod.DELETE },
            );
        }
}
