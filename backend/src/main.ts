import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dataSource } from './data/datasource';
import { scheduleJob, RecurrenceRule } from "node-schedule";
import { Guild } from './data/entities/Guild';
import { Download, ResetLeaderboard } from './database';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await dataSource.initialize();
    await app.listen(2000);

    var hourly = new RecurrenceRule();
    hourly.tz = 'CST';
    hourly.minute = 0;

    scheduleJob(hourly, () => { 
        console.log(`[DATABASE] Reset Hourly Leaderboards`);
        ResetLeaderboard("hourly");
    });

    var daily = new RecurrenceRule();
    daily.tz = 'CST';
    daily.minute = 0;
    daily.hour = 0;

    scheduleJob(daily, () => { 
        console.log(`[DATABASE] Reset Daily Leaderboards`);
        ResetLeaderboard("daily");
    });

    var weekly = new RecurrenceRule();
    weekly.tz = 'CST';
    weekly.minute = 0;
    weekly.hour = 0;
    weekly.dayOfWeek = 1;

    scheduleJob(weekly, () => { 
        console.log(`[DATABASE] Reset Weekly Leaderboards`);
        ResetLeaderboard("weekly");
    });

    var monthly = new RecurrenceRule();
    monthly.tz = 'CST';
    monthly.minute = 0;
    monthly.hour = 0;
    monthly.date = 1;

    scheduleJob(monthly, () => { 
        console.log(`[DATABASE] Reset Monthly Leaderboards`);
        ResetLeaderboard("monthly");
    });

    var loop = new RecurrenceRule();
    loop.tz = 'CST';
    loop.second = 0;

    scheduleJob(loop, async () => {
        let guilds = await dataSource.getRepository(Guild).find();

        for (let guild of guilds) {
            console.log(`[DATABASE] [LOOP] [${guild.id}] ${guild.name}`);
            Download(guild.id, guild.type);
        }
    }); // 1 Minute
}
bootstrap();
