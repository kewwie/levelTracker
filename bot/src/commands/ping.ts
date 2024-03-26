import { Command } from "../types/Command";

export const command: Command = {
    config: {
        name: "ping",
        description: "Shows the bot's latency",
        type: 1,
        contexts: [0],
        integration_types: [0, 1]
    },
    async execute(client, interaction) {
        await interaction.reply(`Pong! Latency is ${Date.now() - interaction.createdTimestamp}ms.`);
    }
}