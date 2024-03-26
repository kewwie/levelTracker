import { Button } from "../types/Button";

export const button: Button = {
    data: {
        custom_id: "random",
        label: "Random",
        style: "PRIMARY",
    },
    execute: (interaction) => {
        interaction.reply("Random button pressed!");
    }
}