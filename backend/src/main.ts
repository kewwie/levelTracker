import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { guildsData } from './guildsData';

import { dataSource } from './data/datasource';
import { Guild } from './data/entities/guild';
import { User } from './data/entities/user';
import { Member } from './data/entities/member';


async function bootstrap() {
    const GuildRepository = await dataSource.getRepository(Guild);
    console.log(1)
    for (let guildData of guildsData) {
        /*GuildRepository.upsert({
            guildId: guildData.guildId,
            iconUrl: guildData.iconUrl,
            name: guildData.name,
            type: guildData.type,
            active: true,
            prefix: null
        }, ["guildId"]);*/
        /*GuildRepository.insert({
            ...guildData,
            active: true,
            prefix: null
        });*/
        console.log(await GuildRepository.find())
    }

    const app = await NestFactory.create(AppModule);
    await app.listen(2000);
}
bootstrap();
