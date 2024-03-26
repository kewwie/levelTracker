import {
    Client,
    GatewayIntentBits,
    Collection,
} from "discord.js";

import { EventHandler } from "./eventHandler";
import { CommandHandler } from "./commandHandler";
import { ButtonHandler } from "./buttonHandler";
import { Button } from "./types/Button";
import { Command } from "./types/Command";

export class KiwiClient extends Client {
    public commands: Collection<String, Command>;
    public buttons: Collection<String, Button>;

    public eventHandler: EventHandler;
    public commandHandler: CommandHandler;
    public buttonHandler: ButtonHandler;

    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
            ]
        });

        this.commands = new Collection();
        this.buttons = new Collection();
        
        // Event Loader
        this.eventHandler = new EventHandler(this);
        this.eventHandler.load();

        // Command Loader
        this.commandHandler = new CommandHandler(this);
        this.commandHandler.load();

        // Button Loader
        this.buttonHandler = new ButtonHandler(this);
        this.buttonHandler.load();
    }
};