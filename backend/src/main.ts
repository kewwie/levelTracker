import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { guildsData } from './guildsData';
import { GuildSettings } from './data/GuildSettings';

async function bootstrap() {
    const guilds = new GuildSettings();

    for (let guildData of guildsData) {
        guilds.addGuild(guildData);
    }

    const app = await NestFactory.create(AppModule);
    await app.listen(2000);
}
bootstrap();
