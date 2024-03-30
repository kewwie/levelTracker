import { Command } from "../types/Command";
import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageActionRowComponentBuilder } from "discord.js";
import { env } from "../env";
import { StyleNumber } from "../utils/styleNumber";

export const command: Command = {
    config: {
        name: "leaderboard",
        description: "Get the leaderboard for the server",
        type: 1,
        contexts: [0],
        integration_types: [0, 1],
        options: [
            {
                name: "type",
                description: "The leaderboard you want to view",
                type: 3,
                required: true,
                choices: [
                    {
                        name: "XP Leaderboard",
                        value: "xp"
                    },
                    {
                        name: "Minutes Leaderboard",
                        value: "minutes"
                    }
                ]
            },
            {
                name: "leaderboard",
                description: "The type of leaderboard you want in time",
                type: 3,
                required: true,
                choices: [
                    {
                        name: "Hourly",
                        value: "hourly"
                    },
                    {
                        name: "Daily",
                        value: "daily"
                    },
                    {
                        name: "Weekly",
                        value: "weekly"
                    },
                    {
                        name: "Monthly",
                        value: "monthly"
                    },
                    /*{
                        name: "All-Time",
                        value: "all"
                    }*/
                ]
            }
        ]
    },
    async execute(client, interaction) {
        var type = interaction.options.get("type")?.value;
        var time = interaction.options.get("leaderboard")?.value;

        var data = await fetch(
            env.INTERNAL_API +
            "/guilds/" +
            interaction.guildId +
            "/leaderboard" +
            `/${time}` +
            `/${type}` +
            "?" +
            new URLSearchParams({ page: "0", amount: "10" })
        ).then(res => res.json());

        if (data.message) {
            return interaction.reply({ content: data.message, ephemeral: true });
        }

        var fields = [], lbRank = 0;
        for (let player of data.members) {
            var tag, value = 0;

            if (player.discriminator === "0") {
                tag = player.username;
            }
            else {
                tag = player.username + "#" + player.discriminator;
            }

            if (tag.includes("__")) {
                tag = "```" + tag + "```";
            }

            switch (type) {
                case "xp":
                    value = player[time + "Xp"];
                    break;

                case "minutes":
                    value = player[time + "Minutes"];
                    break;
            }


            lbRank++;
            fields.push({
                name: `${lbRank}. ${tag}`,
                value: `${StyleNumber(value)} ${String(type).charAt(0).toUpperCase() + String(type).slice(1)}${type === "message" ? "s" : ""}`,
                inline: false
            });
        }

        let em = new EmbedBuilder({fields: fields})
            .setColor("#0099ff")
            .setTitle(`${String(time).charAt(0).toUpperCase() + String(time).slice(1)} ${String(type).toUpperCase()} Leaderboard`)
            .setTimestamp()
            .setFooter({ text: "Whole leaderboard on the web" });

        let row = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
            new ButtonBuilder()
            .setLabel("View on website")
            .setStyle(ButtonStyle.Link)
            .setURL(`${env.URL}/leaderboard/${interaction.guildId}/${type}?lb=${time}`),
        );

        await interaction.reply({embeds: [em], components: [row], ephemeral: false});
    }
}