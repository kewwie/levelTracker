import { ButtonInteraction } from "discord.js";
import { KiwiClient } from "../client";

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
    execute: (client: KiwiClient, interaction: ButtonInteraction) => void;
}