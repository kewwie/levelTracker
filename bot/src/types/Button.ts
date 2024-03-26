import { ButtonInteraction } from "discord.js";

export interface Button {
    data: {
        custom_id?: string;
        label: string;
        style: "PRIMARY" | "SECONDARY" | "SUCCESS" | "DANGER";
        disabled?: boolean;
        emoji?: {
            name: string;
            id?: string;
            animated?: boolean;
        };
        url?: string;
    };
    execute: (interaction: ButtonInteraction) => void;
}