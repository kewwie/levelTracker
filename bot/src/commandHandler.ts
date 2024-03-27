import { KiwiClient } from "./client";
import { env } from "./env";
import { readdirSync } from "fs";
import { join } from "path";
import { Command } from "./types/Command";
import { REST, Routes } from "discord.js";

export class CommandHandler {
    private client: KiwiClient;
    //private discordUrl: string;

    constructor(client: KiwiClient) {
        this.client = client;
        //this.discordUrl = "https://discord.com/api/v10/applications/" + env.CLIENT_ID + "/commands"
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
        }

        const rest = new REST({ version: '10' }).setToken(env.CLIENT_TOKEN);

        let data: any = await rest.put(
            Routes.applicationCommands(env.CLIENT_ID),
            { body: cmds }
        )

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    }
};