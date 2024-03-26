import { Event } from "../types/Event";

export const event: Event = {
    name: "ready",
    once: true,
    execute: async (client) => {
        console.log(`Logged in as ${client.user?.tag}`);

        client.commandHandler.register(Array.from(client.commands.values()));
    }
}