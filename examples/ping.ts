import { Client, Message } from '../mod.ts';
import { token } from './config.example.ts'

let client = new Client(token);

client.start();

client.on("ready", () => {
    console.log("Connected to the Discord gateway!")
})
client.on("message", async(msg: Message) => {
    if(msg.content === "!ping") {
        msg.channel.send("Pong! :ping_pong: " + client.ping + "ms")
    }
})