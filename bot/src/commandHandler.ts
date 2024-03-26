import { KiwiClient } from "./client";
import { env } from "./env";
import { readdirSync } from "fs";
import { join } from "path";
import { Command } from "./types/Command";

export class CommandHandler {
    private client: KiwiClient;
    private discordUrl: string;

    constructor(client: KiwiClient) {
        this.client = client;
        this.discordUrl = "https://discord.com/api/v10/applications/" + env.CLIENT_ID + "/commands"
    }

    load() {
        for (let file of readdirSync(join(__dirname, "commands"))) {
            const { command } = require(join(__dirname, "commands/", file));
            this.client.commands.set(command.config.name, command);
        }
    }

    async register(commands: Command[]) {

        var cmds = new Array();

        for (let command of commands) {
            cmds.push(command.config);

            console.log(`Registered command ${command.config.name}`);
        }

        let r = await fetch(this.discordUrl, {
            method: "POST",
            headers: {
                Authorization: `Bot ${env.CLIENT_TOKEN}`,
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(cmds),
        });

        console.log(cmds)

        console.log((await r.json()).errors);
    }
  };