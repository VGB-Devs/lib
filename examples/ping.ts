import { Client, Message } from '../mod.ts';

let client = new Client("Nzc3MTExODg0MDI5MjMxMTM1.X6-r1w.jMVEj7_jrB8BkT0RsCpF5S3LKuw");

client.start();

client.on("ready", () => {
    console.log("Connected to the Discord gateway!")
})
client.on("message", async(msg: Message) => {
    if(msg.content === "!ping") {
        msg.channel.send("Pong!")
    }
})