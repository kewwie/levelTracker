import { AutocompleteInteraction, CommandInteraction } from "discord.js";
import { KiwiClient } from "../client";

export interface Command {
    config: {
        name: string;
        description: string;
        type?: 0 | 1 | 2;
        guild_id?: string;
        options?: {
            name: string;
            description: string;
            type: number;
            required?: boolean;
            choices?: {
                name: string;
                value: string;
            }[];
            autocomplete?: boolean;
        }[];
        contexts: (0 | 1 | 2)[];
        integration_types: (0 | 1)[];
    };
    execute: (client: KiwiClient, integration: CommandInteraction ) => void;
    autocomplete?: (interaction: AutocompleteInteraction) => void;
}