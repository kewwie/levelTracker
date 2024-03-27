import {
	Interaction,
	Client,
    Events
} from "discord.js";
import { KiwiClient } from "../client";
import { Event } from "../types/Event";

export const event: Event = {
    name: "interactionCreate",
    execute: async (client: KiwiClient, interaction: any) => {
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;
            try {
                command.execute(client, interaction);
            } catch (err) {
                if (err) console.error(err);
                interaction.reply({
                    content: "An error occurred while executing that command.",
                    ephemeral: true,
                });
            }

            } else if (interaction.isAutocomplete()) {
                const command = client.commands.get(interaction.commandName);
        
                if (!command) {
                    console.error(`No command matching ${interaction.commandName} was found.`);
                    return;
                }
        
                try {
                    if (command.autocomplete) {
                        command.autocomplete(interaction);
                    }
                } catch (error) {
                    console.error(error);
                }

            } else if (interaction.isButton()) {
    
            const buttonId = (interaction.customId).split("_")[0];
            const button = client.buttons.get(buttonId);

            if (!button) { return }
        
            try {
                button.execute(client, interaction);
            } catch (err) {
                if (err) console.error(err);
                interaction.reply({
                    content: "An error occurred while trying to execute this button.",
                    ephemeral: true,
                });
            }
            } else if (interaction.isSelectMenu()) {
                const button = client.buttons.get(interaction.customId);
                if (button) return button.execute(client, interaction);
            }
    }
}