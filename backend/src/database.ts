import axios from "axios";

import { MoreThan } from "typeorm";
import { dataSource } from "./data/datasource";
import { Member } from "./data/entities/Member";
import { Coins } from "./data/entities/Coins";
import { Guild } from "./data/entities/Guild";
import { MostActive } from "./data/entities/MostActive";

const fetch = async (url) => {
	const response: any = await axios.get(url)
	
	if (response.status !== 200) {
		if (response.data.error && response.data.error.message)
			throw new Error(`${response.data.error.status_code}: ${response.data.error.message}`);
		else throw new Error(`${response.statusCode}: ${response.statusMessage}`);
	}

	return response.data;
};

export const Download = async (guildId: string, type: string) => {
    switch(type) {
        case "mee6": {
            let apiUrl = "https://mee6.xyz/api/plugins/levels/leaderboard/";
            let maxPages = 5;

            var leaderboard = [];

            for (let pageCount = 0; pageCount < (maxPages - 1); pageCount++) {
                let limit = 1000;
                let { players } = await fetch(apiUrl + `${guildId}?limit=${limit}&page=${pageCount}`);
                let page = players.map((user, index) => {
                    const { id, level, username, discriminator, avatar, message_count: messageCount } = user;
                    const avatarUrl = `https://cdn.discordapp.com/avatars/${id}/${avatar}`;
                    const [userXp, levelXp, totalXp] = user.detailed_xp;
                    return {
                        id, level, username, discriminator, avatarUrl, messageCount,
                        tag: `${username}#${discriminator}`,
                        xp: { userXp, levelXp, totalXp },
                        rank: (limit * pageCount) + index + 1
                    };
                });

                leaderboard.push(...page);
            }
        }
    }

    let membersDb = await dataSource.getRepository(Member);

    for (let member of leaderboard) {
        if (member.level < 10) { break; }
        let existingMember = await membersDb.findOne({ where: {guildId: guildId, userId: member.id} });

        if (existingMember) {
            let xpGain = member.xp.totalXp - existingMember.xp;
            let minutesGain = member.messageCount - existingMember.minutes;

            if (minutesGain > 0 || xpGain > 0 || member.rank !== existingMember.rank) {
                var averageXp = existingMember.averageXp;

                if (xpGain < 100) {
                    averageXp = (existingMember.averageXp + xpGain) / 2;
                }

                membersDb.update({ guildId: guildId, userId: member.id }, {
                    username: member.username,
                    discriminator: member.discriminator,
                    tag: member.tag,
                    avatarUrl: member.avatarUrl,
                    rank: member.rank,
                    level: member.level,
                    xp: member.xp.totalXp,
                    averageXp,
                    hourlyXp: existingMember.hourlyXp + xpGain,
                    dailyXp: existingMember.dailyXp + xpGain,
                    weeklyXp: existingMember.weeklyXp + xpGain,
                    monthlyXp: existingMember.monthlyXp + xpGain,
                    minutes: member.messageCount,
                    hourlyMinutes: existingMember.hourlyMinutes + minutesGain,
                    dailyMinutes: existingMember.dailyMinutes + minutesGain,
                    weeklyMinutes: existingMember.weeklyMinutes + minutesGain,
                    monthlyMinutes: existingMember.monthlyMinutes + minutesGain
                });
            }

        } else {

            membersDb.insert({
                guildId: guildId,
                userId: member.id,
                username: member.username,
                discriminator: member.discriminator,
                tag: member.tag,
                avatarUrl: member.avatarUrl,
                rank: member.rank,
                level: member.level,
                xp: member.xp.totalXp,
                minutes: member.messageCount
            });
        }
    }
    
    let members = await membersDb.find({ where: { guildId }});
    
    for (let member of members) {
        if ((leaderboard.find((user) => user.id === member.userId)) === undefined) {
            membersDb.delete(member.id);
        }
    }
};

export const ResetLeaderboard = async (type: string) => {
    let membersDb = await dataSource.getRepository(Member);
    let guildDb = await dataSource.getRepository(Guild);
    let mostActiveDb = await dataSource.getRepository(MostActive);

    switch (type) {
        case "hourly": {
            for (let server of await guildDb.find()) {
                let ActiveXpMember = await membersDb.findOne({
                    where: { guildId: server.id },
                    order: { hourlyXp: "DESC" }
                });
                let ActiveMinutesMember = await membersDb.findOne({
                    where: { guildId: server.id },
                    order: { hourlyMinutes: "DESC" }
                });

                
                if (ActiveXpMember) {
                    let guild = await mostActiveDb.findOne({ where: { guildId: server.id, leaderboard: "xp", type: "hourly" } });
                    if (guild) {
                        mostActiveDb.update({ guildId: server.id }, { userId: ActiveXpMember.userId, amount: ActiveXpMember.hourlyXp });
                    } else {
                        mostActiveDb.insert({ guildId: server.id, leaderboard: "xp", type: "hourly", userId: ActiveXpMember.userId, amount: ActiveXpMember.hourlyXp });
                    }
                }
                if (ActiveMinutesMember) {
                    let guild = await mostActiveDb.findOne({ where: { guildId: server.id, leaderboard: "minutes", type: "hourly" } });
                    if (guild) {
                        mostActiveDb.update({ guildId: server.id }, {userId: ActiveMinutesMember.userId, amount: ActiveMinutesMember.hourlyMinutes });
                    } else {
                        mostActiveDb.insert({ guildId: server.id, leaderboard: "minutes", type: "hourly", userId: ActiveMinutesMember.userId, amount: ActiveMinutesMember.hourlyMinutes });
                    }
                }
            }

            membersDb.update({}, { hourlyXp: 0, hourlyMinutes: 0 });
            break;
        }

        case "daily": {
            for (let member of await membersDb.find({ where: { dailyXp: MoreThan(0) } })) {
                let coinsDb = await dataSource.getRepository(Coins);

                let coins = member.dailyXp / 100;
                if (coins < 1) { break; }
                let existingCoins = await coinsDb.findOne({ where: { userId: member.userId } });

                if (existingCoins) {
                    coinsDb.update({ userId: member.userId }, { coins: existingCoins.coins + coins });
                } else {
                    coinsDb.insert({ userId: member.userId, coins });
                }
            };

            for (let server of await guildDb.find()) {
                let ActiveXpMember = await membersDb.findOne({
                    where: { guildId: server.id },
                    order: { dailyXp: "DESC" }
                });
                let ActiveMinutesMember = await membersDb.findOne({
                    where: { guildId: server.id },
                    order: { dailyMinutes: "DESC" }
                });
                
                if (ActiveXpMember) {
                    let guild = await mostActiveDb.findOne({ where: { guildId: server.id, leaderboard: "xp", type: "daily" } });
                    if (guild) {
                        mostActiveDb.update({ guildId: server.id }, {userId: ActiveXpMember.userId, amount: ActiveXpMember.dailyXp });
                    } else {
                        mostActiveDb.insert({ guildId: server.id, leaderboard: "xp", type: "daily", userId: ActiveXpMember.userId, amount: ActiveXpMember.dailyXp });
                    }
                }
                if (ActiveMinutesMember) {
                    let guild = await mostActiveDb.findOne({ where: { guildId: server.id, leaderboard: "minutes", type: "daily" } });
                    if (guild) {
                        mostActiveDb.update({ guildId: server.id }, {userId: ActiveMinutesMember.userId, amount: ActiveMinutesMember.dailyMinutes });
                    } else {
                        mostActiveDb.insert({ guildId: server.id, leaderboard: "minutes", type: "daily", userId: ActiveMinutesMember.userId, amount: ActiveMinutesMember.dailyMinutes });
                    }
                }
            }
            
            membersDb.update({}, { dailyXp: 0, dailyMinutes: 0 });
            break;
        }

        case "weekly": {
            for (let server of await guildDb.find()) {
                let ActiveXpMember = await membersDb.findOne({
                    where: { guildId: server.id },
                    order: { weeklyXp: "DESC" }
                });
                let ActiveMinutesMember = await membersDb.findOne({
                    where: { guildId: server.id },
                    order: { weeklyMinutes: "DESC" }
                });
                
                if (ActiveXpMember) {
                    let guild = await mostActiveDb.findOne({ where: { guildId: server.id, leaderboard: "xp", type: "weekly" } });
                    if (guild) {
                        mostActiveDb.update({ guildId: server.id }, { userId: ActiveXpMember.userId, amount: ActiveXpMember.weeklyXp});
                    } else {
                        mostActiveDb.insert({ guildId: server.id, leaderboard: "xp", type: "weekly", userId: ActiveXpMember.userId, amount: ActiveXpMember.weeklyXp});
                    }
                }
                if (ActiveMinutesMember) {
                    let guild = await mostActiveDb.findOne({ where: { guildId: server.id, leaderboard: "minutes", type: "weekly" } });
                    if (guild) {
                        mostActiveDb.update({ guildId: server.id }, {userId: ActiveMinutesMember.userId, amount: ActiveMinutesMember.weeklyMinutes });
                    } else {
                        mostActiveDb.insert({ guildId: server.id, leaderboard: "minutes", type: "weekly", userId: ActiveMinutesMember.userId, amount: ActiveMinutesMember.weeklyMinutes });
                    }
                }
            }

            membersDb.update({}, { weeklyXp: 0, weeklyMinutes: 0 });
            break;
        }

        case "monthly": {
            for (let server of await guildDb.find()) {
                let ActiveXpMember = await membersDb.findOne({
                    where: { guildId: server.id },
                    order: { monthlyXp: "DESC" }
                });
                let ActiveMinutesMember = await membersDb.findOne({
                    where: { guildId: server.id },
                    order: { monthlyMinutes: "DESC" }
                });
                
                if (ActiveXpMember) {
                    let guild = await mostActiveDb.findOne({ where: { guildId: server.id, leaderboard: "xp", type: "monthly" } });
                    if (guild) {
                        mostActiveDb.update({ guildId: server.id }, { userId: ActiveXpMember.userId, amount: ActiveXpMember.monthlyXp});
                    } else {
                        mostActiveDb.insert({ guildId: server.id, leaderboard: "xp", type: "monthly", userId: ActiveXpMember.userId, amount: ActiveXpMember.monthlyXp});
                    }
                }
                if (ActiveMinutesMember) {
                    let guild = await mostActiveDb.findOne({ where: { guildId: server.id, leaderboard: "minutes", type: "monthly" } });
                    if (guild) {
                        mostActiveDb.update({ guildId: server.id }, {userId: ActiveMinutesMember.userId, amount: ActiveMinutesMember.monthlyMinutes });
                    } else {
                        mostActiveDb.insert({ guildId: server.id, leaderboard: "minutes", type: "monthly", userId: ActiveMinutesMember.userId, amount: ActiveMinutesMember.monthlyMinutes });
                    }
                }
            }

            membersDb.update({}, { monthlyXp: 0, monthlyMinutes: 0 });
            break;
        }
            
    };
};