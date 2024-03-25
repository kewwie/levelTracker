import { GuildsController } from './guilds.controller';
import { GuildsService } from './guilds.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [GuildsController],
  providers: [GuildsService],
})
export class GuildsModule {}
