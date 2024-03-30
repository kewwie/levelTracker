import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dataSource } from './data/datasource';
import { scheduleJob } from "node-schedule";
import { Guild } from './data/entities/Guild';
import { Download, ResetLeaderboard } from './database';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await dataSource.initialize();
    await app.listen(2000);

    scheduleJob('0 * * * *', () => { 
        console.log(`[DATABASE] Reset Hourly Leaderboards`);
        ResetLeaderboard("hourly");
    });

    scheduleJob('0 0 * * *', () => { 
        console.log(`[DATABASE] Reset Daily Leaderboards`);
        ResetLeaderboard("daily");
    });

    scheduleJob('0 0 * * 1', () => { 
        console.log(`[DATABASE] Reset Weekly Leaderboards`);
        ResetLeaderboard("weekly");
    });

    scheduleJob('0 0 1 * *', () => { 
        console.log(`[DATABASE] Reset Monthly Leaderboards`);
        ResetLeaderboard("monthly");
    });

    setInterval(async () => {
        let guilds = await dataSource.getRepository(Guild).find();

        for (let guild of guilds) {
            console.log(`[DATABASE] [LOOP] [${guild.id}] ${guild.name}`);
            Download(guild.id, guild.type);
        }
    }, 60 * 1000) // 1 Minute
}
bootstrap();
