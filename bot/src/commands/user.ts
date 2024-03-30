import { Command } from "../types/Command";
import { env } from "../env";
import { MemberResponse } from "../types/MemberResponse";
import { EmbedBuilder } from "discord.js";
import { StyleNumber } from "../utils/styleNumber";

export const command: Command = {
    config: {
        name: "user",
        description: "Get levelling information about a user.",
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

        var { xp } = (await fetch(
            env.INTERNAL_API + `/level?` + new URLSearchParams({ level: String(data.level + 1) })
        ).then(res => res.json())); 

        var embed = new EmbedBuilder()
            .setColor("#0099ff")
            .setAuthor({ name: data.tag, iconURL: data.avatarUrl })
            .addFields(
                { name: "Rank", value: `#${data.rank}`, inline: true },
                { name: "Level", value: `${data.level}`, inline: true },
                { name: "Average XP", value: `${StyleNumber(data.averageXp || 20)}`, inline: true },

                { name: "Total", value: `${StyleNumber(data.messages)} Messages \n${StyleNumber(data.xp)} Xp`, inline: true },
            )
            .setTimestamp()
            .setFooter({ text: `You need to chat${StyleNumber((xp - data.xp) / (data.averageXp || 20))} minutes to level up` })
    
        await interaction.reply({ embeds: [embed], ephemeral: false });
    }
}