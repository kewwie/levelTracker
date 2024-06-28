import { Command } from "../types/Command";
import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageActionRowComponentBuilder } from "discord.js";

export const command: Command = {
    config: {
        name: "about",
        description: "Get info about the service",
        type: 1,
        contexts: [0],
        integration_types: [0, 1],
    },
    async execute(client, interaction) {
        let embed = new EmbedBuilder()
			.setColor("#0099ff")
			.setTitle(`About ${client.user?.username}`)
			.addFields(
				{ name: "Developer", value: "kewi", inline: true },
				{ name: "Discord Latency", value: `${Math.round(client.ws.ping)}ms`, inline: true },
			)
			.setTimestamp();
	
		let row = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
			new ButtonBuilder()
			.setLabel("Support Server")
			.setStyle(ButtonStyle.Link)
			.setURL("https://discord.gg/xyjubXnX9T"),
		);
	
		await interaction.reply({
			embeds: [embed],
			components: [row],
		});
    }
}