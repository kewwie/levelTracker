import { Command } from "../types/Command";
import { env } from "../env";
import { MemberResponse } from "../types/MemberResponse";
import { EmbedBuilder } from "discord.js";
import { StyleNumber } from "../utils/styleNumber";

export const command: Command = {
    config: {
        name: "compare",
        description: "Compare a users statistics",
        type: 1,
        contexts: [0],
        integration_types: [0, 1],
        options: [
            {
                name: "member1",
                description: "Select the 1st user",
                type: 6,
                required: true,
            },
            {
                name: "member2",
                description: "Select the 2nd user",
                type: 6,
                required: true,
            }
        ]
    },
    async execute(client, interaction) {
		var user1, user2;

		if (!interaction.options.get("member1")) {
			user1 = interaction.user.id;
		} else {
			user1 = interaction.options.get("member1")?.value;
		}

		if (!interaction.options.get("member2")) {
			user2 = interaction.user.id;
		} else {
			user2 = interaction.options.get("member2")?.value; 
		}

		if (user1 === user2) {
			await interaction.reply({content: "Can't be the same user", ephemeral: true});
			return;
		}

		var userData1: MemberResponse = (await fetch(env.INTERNAL_API + "/guilds/" + interaction.guildId + "/users/" + user1).then(res => res.json()));
		var userData2: MemberResponse = (await fetch(env.INTERNAL_API + "/guilds/" + interaction.guildId + "/users/" + user2).then(res => res.json()));

		if (userData1.message || userData2.message) {
			await interaction.reply({content: "One or both of the users doesn't have any stats", ephemeral: true});
			return;
		}
		
		const getUserDisplayStats = (user: MemberResponse) => {
			var userStats = [
				`**Rank:** #${user.rank}`,
				`**Level:** ${user.level}`,
				`**Total Xp:** ${StyleNumber(user.xp)}`,
				`**Average Xp:** ${StyleNumber((user.averageXp || 20))}`,
				`**Hourly Xp:** ${StyleNumber(user.hourlyXp)}`,
				`**Daily Xp:** ${StyleNumber(user.dailyXp)}`,
				`**Weekly Xp:** ${StyleNumber(user.weeklyXp)}`,
				`**Monthly Xp:** ${StyleNumber(user.monthlyXp)}`,
				`**Messages:** ${StyleNumber(user.messages)}`,
				`**Hourly Messages:** ${StyleNumber(user.hourlyMsg)}`,
				`**Daily Messages:** ${StyleNumber(user.dailyMsg)}`,
				`**Weekly Messages:** ${StyleNumber(user.weeklyMsg)}`,
				`**Monthly Messages:** ${StyleNumber(user.monthlyMsg)}`,
			];
			return userStats.join("\n");
		}

		var embed = new EmbedBuilder()
			.setColor("#0099ff")
			.setTimestamp();

	    embed.addFields(
			{ name: `**${userData1.tag}**`, value: getUserDisplayStats(userData1), inline: true },
			{ name: '\u200B', value: '\u200B', inline: true },
			{ name: `**${userData2.tag}**`, value: getUserDisplayStats(userData2), inline: true },
		);

		interaction.reply({embeds: [embed]});
    }
}