import { Command } from "../types/Command";
import { EmbedBuilder } from "discord.js";
import { env } from "../env";
import { StyleNumber } from "../utils/styleNumber";
import { MemberResponse } from "../types/MemberResponse";

export const command: Command = {
    config: {
        name: "level",
        description: "Get stats about a level",
        type: 1,
        contexts: [0],
        integration_types: [0, 1],
        options: [
            {
                name: "level",
                description: "A level you want to get information about",
                type: 4,
                required: true,
            },
            {
                name: "member",
                description: "The member you wanna use to get the level information",
                type: 6,
                required: false,
            }
        ]
    },
    async execute(client, interaction) {
        var user;

		if (!interaction.options.get("member")) {
			user = interaction.user.id;
		} else {
			user = interaction.options.get("member")?.value;
		}

        var data: MemberResponse = await fetch(env.INTERNAL_API + "/guilds/" + interaction.guildId + "/users/" + user).then(res => res.json());

        if (data.message) {
            await interaction.reply({content: "This user doesn't have any stats", ephemeral: true});
            return;
        }

        var wantedLevel = interaction.options.get("level")?.value;

        if (wantedLevel) {
            if (data.level >= Number(wantedLevel)) {
                await interaction.reply({content: "The user already have achived this level", ephemeral: true});
                return;
            }
    
            var { xp } = (await fetch(
                env.INTERNAL_API + `/level?` + new URLSearchParams({ level: String(wantedLevel) })
            ).then(res => res.json())); 

            console.log(xp, data.xp, data.averageXp || 20);

            var embed = new EmbedBuilder()
                .setColor("#0099ff")
                .setAuthor({ name: data.tag, iconURL: data.avatarUrl })
                .addFields(
                    { name: "Level", value: `${wantedLevel}`, inline: false },
                    { name: "Xp to Level " + wantedLevel, value: `${StyleNumber(xp - data.xp)}`, inline: false },
                    { name: "Minutes to Level " + wantedLevel, value: `${StyleNumber((xp - data.xp) / (data.averageXp || 20))}`, inline: false },
                )
                .setTimestamp()

            await interaction.reply({embeds: [embed], ephemeral: false});
        }
    }
}