import { Client, Message, Shard, ShardingManager } from '../mod.ts';

let client = new Client("Nzc3MTExODg0MDI5MjMxMTM1.X6-r1w.VFBjz-VHjZRQO5i_kLLK1hx7kPs");

client.start();
let shardman = new ShardingManager(client.token, 1, client);
client.on("ready", () => {
    console.log("Connected to the Discord gateway!")
})
client.on("message", async(msg: Message) => {
    if(msg.content === "!ping") {
        msg.channel.send("OK");
    }
})