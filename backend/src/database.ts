import axios from "axios";

import { dataSource } from "./data/datasource";
import { Member } from "./data/entities/Member";

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
        let existingMember = await membersDb.findOne({ where: {guildId: guildId, userId: member.id} });

        if (existingMember) {
            let xpGain = member.xp.totalXp - existingMember.xp;
            let msgGain = member.messageCount - existingMember.messages;

            if (msgGain < 0 || xpGain < 0 || member.rank !== existingMember.rank) {

                await membersDb.update([ guildId, existingMember.userId ], {
                    username: member.username,
                    discriminator: member.discriminator,
                    tag: member.tag,
                    avatarUrl: member.avatarUrl,
                    rank: member.rank,
                    level: member.level,
                    xp: member.xp.totalXp,
                    averageXp: (existingMember.averageXp + xpGain) / (msgGain || 1),
                    hourlyXp: existingMember.hourlyXp + xpGain,
                    dailyXp: existingMember.dailyXp + xpGain,
                    weeklyXp: existingMember.weeklyXp + xpGain,
                    monthlyXp: existingMember.monthlyXp + xpGain,
                    messages: member.messageCount,
                    hourlyMsg: existingMember.hourlyMsg + msgGain,
                    dailyMsg: existingMember.dailyMsg + msgGain,
                    weeklyMsg: existingMember.weeklyMsg + msgGain,
                    monthlyMsg: existingMember.monthlyMsg + msgGain
                });
            }

        } else {
            //console.log(existingMember, member);
            //console.log(await membersDb.findOne({ where: { guildId: guildId, userId: member.id }}));

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
                messages: member.messageCount
            });
        }
    }
    /*
    let members = await membersDb.find({ where: { guildId }});
    for (let member of members) {
        if (member.id !== leaderboard.find((user) => user.id === member.id)) {
            membersDb.delete(member.id);
        }
    }*/
};

export const ResetLeaderboard = async (type: string) => {
    let membersDb = await dataSource.getRepository(Member);

    switch (type) {
        case "hourly": {
            membersDb.update({}, { hourlyXp: 0, hourlyMsg: 0 });
            break;
        }

        case "daily": {
            membersDb.update({}, { dailyXp: 0, dailyMsg: 0 });
            break;
        }

        case "weekly": {
            membersDb.update({}, { weeklyXp: 0, weeklyMsg: 0 });
            break;
        }

        case "monthly": {
            membersDb.update({}, { monthlyXp: 0, monthlyMsg: 0 });
            break;
        }
            
    };
};