import { Button } from "../types/Button";

export const button: Button = {
    data: {
        custom_id: "random",
        label: "Random",
        style: "PRIMARY",
    },
    execute: (client, interaction) => {
        interaction.reply("Random button pressed!");
    }
}