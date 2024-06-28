import { KiwiClient } from "./client";
import { readdirSync } from "fs";
import { join } from "path";
export class ButtonHandler {
    private client: KiwiClient;

    constructor(client: KiwiClient) {
        this.client = client;
    }

    load() {
        for (let file of readdirSync(join(__dirname, "buttons"))) {
            const { button } = require(join(__dirname, "buttons/", file));
            this.client.buttons.set(button.data.custom_id, button);
        }
    }
};
