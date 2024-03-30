import { Command } from "../types/Command";
import { env } from "../env";
import { MemberResponse } from "../types/MemberResponse";
import { EmbedBuilder } from "discord.js";
import { StyleNumber } from "../utils/styleNumber";

export const command: Command = {
    config: {
        name: "stats",
        description: "Get a users daily level stats.",
        type: 1,
        contexts: [0],
        integration_types: [0, 1],
        options: [
            {
                name: "member",
                description: "The member you want to get information about.",
                type: 6,
                required: false,
            }
        ]
    },
    async execute(client, interaction) {
        let data: MemberResponse  = await fetch(
            env.INTERNAL_API + "/guilds/" + interaction.guildId + "/users/" + (interaction.options.get("member")?.value || interaction.user.id), 
        ).then(res => res.json());

        if (data.message) {
            return interaction.reply(data.message);
        }
        
        var embed = new EmbedBuilder()
            .setColor("#0099ff")
            .setAuthor({ name: data.tag, iconURL: data.avatarUrl })
            .addFields(
                { name: "Hourly", value: `${StyleNumber(data.hourlyMsg)} Minutes\n${StyleNumber(data.hourlyXp)} XP`, inline: true },
                { name: "Daily", value: `${StyleNumber(data.dailyMsg)} Minutes\n${StyleNumber(data.dailyXp)} XP`, inline: true },
                { name: "Weekly", value: `${StyleNumber(data.weeklyMsg)} Minutes\n${StyleNumber(data.weeklyXp)} XP`, inline: true },
                { name: "Monthly", value: `${StyleNumber(data.monthlyMsg)} Minutes\n${StyleNumber(data.monthlyXp)} XP`, inline: true },
            )
            .setTimestamp()
            .setFooter({ text: `You can view a leaderboard about these stats.` })
    
        await interaction.reply({ embeds: [embed], ephemeral: false });
    }
}