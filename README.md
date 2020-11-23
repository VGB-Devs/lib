<img align="center" src="./banner.png" alt="Velocity banner"><br>
<a align="center" href="https://discord.gg/ypTKwQU"><img src="https://discordapp.com/api/guilds/669092504121114644/widget.png?style=shield" alt="Discord" /></a>
<hr />

# velocity
A discord API wrapper written in pure TypeScript

#### Documentation

##### Quick start
As you'll start to find out this library shares many of the same syntax as the [discord.js](https://discord.js.org) library syntax, but with a few variations. 

> Please note that this lib does not currently support intents but we will shortly in the future.

```ts
import { Client, Message } from "https://deno.land/x/velocity@1.0.1/mod.ts"

let client = new Client("token")

client.on("ready", () => {console.log("Connected to the discord gateway!")})

client.on("message", async (msg: Message) => {
    if (msg.author.bot) return;
    if (msg.content == "!ping") {
        await msg.channel.send(`Pong! :ping_pong: \nMy ping is ${client.ping}ms...`) 
        // You can also pass an object through here following the discord embed structure or use our Embed Builder!
        // https://leovoel.github.io/embed-visualizer/
    }
})

client.start()

// To execute me type `deno run --allow-net --allow-read file_name.ts`!
```

##### Author attribute
The author attribute has 5 sub-attributes, which stores the id, username, discriminator, avatar & bot 

```ts
<Message>.author.id // Returns the message creator discord id - String
<Message>.author.username // Returns the message creator username - String
<Message>.author.discriminator // Returns the message creator discirminator - String
<Message>.author.avatar // Returns the URL for the message creator avatar - String
<Message>.author.bot // Returns a boolean to determine if the message creator is a bot or a client - Boolean
```

##### Channel Attribute
The channel attribute has 18 sub attributes which store the channel id, type, guildID, position, permissionOverwrites, name, topic, nsfw, lastMessageID, bitrate, user limit, rate limit per user, recipients, icon, owner id, application id, parent id & last pin time stamp.
```ts
<Message>.channel.id // Returns the channel id as a string
<Message>.channel.type // Returns a number for the type of channel
<Message>.channel.guildId // Returns the guild id as a string
<Message>.channel.position // Returns the channel position, number (Could be null)
<Message>.channel.permissionOverwrites // array of overwrite objects	explicit permission overwrites for members and roles
<Message>.channel.name // Returns the name of the channel - String
<Message>.channel.topic // Returns the channel topic - String
<Message>.channel.nsfw // Returns a boolean if the channel is marked NSFW
<Message>.channel.lastMessageId // Returns the last message id of the channel - string
<Message>.channel.bitrate // Returns the bittrate in bits of the channel (voice) - Intenger
<Message>.channel.userLimit // Returns the user limit of the voice channel - Integer
<Message>.channel.rateLimitePerUser // Returns amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission manage_messages or manage_channel, are unaffected - Integer
<Message>.channel.recipients // Returns the recipents of the DM
<Message>.channel.icon // Returns the icon hash - String
<Message>.channel.ownerId // Returns the DM creator id - String
<Message>.channel.applicationId // Returns application id of the group DM creator if it is bot-created - String
<Message>.channel.parentId // Returns the id of the parent category for a channel (each parent category can contain up to 50 channels) - String
<Message>.channel.lastPinTimestamp // ISO8601 Format Returns the last pin timestamp of the current channel - String

<Message>.channel.send() // Takes a string or an object, if you pass an object it will assume you are sending an embed https://leovoel.github.io/embed-visualizer/
<Message>.delete() // Deletes the current message
```