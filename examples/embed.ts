import { Client, Message, Embed } from '../mod.ts';
import { token } from './config.ts'

let client = new Client(token);

client.start();

client.on("ready", () => {
    console.log("Connected to the Discord gateway!")
})
client.on("message", async(msg: Message) => {
    if(msg.content === "!embed") {
        let embed = new Embed();
        embed.title = "Hey!";
        embed.description = "This embed was built using our embed builder.";
        embed.addField("This is the name for a field", "This is the value of the first field.", true /*inline value for an embed field*/);
        embed.addField("This is another field", "This is the value of the second field.", true);
        embed.color = 0xff3333;
        let mine = msg.channel.send(embed.build);
        setTimeout(async () => { (await mine).delete() }, 1000)
    
}})