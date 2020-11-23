<img align="center" src="./banner.png" alt="Velocity banner"><br>
<a align="center" href="https://discord.gg/ypTKwQU"><img src="https://discordapp.com/api/guilds/669092504121114644/widget.png?style=shield" alt="Discord" /></a>
<hr />

# velocity
A Discord API wrapper written in pure TypeScript.

#### Documentation

##### Quick start
velocity shares a lot of similar syntax with the [discord.js](https://discord.js.org) library, but with a few variations. 

> Please note that velocity does not currently support intents yet, we will shortly in the future.

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

// To run the code, type `deno run --allow-net --allow-read file_name.ts`!
```

##### User Class
The user class has 5 sub-attributes, which are: id, username, discriminator, avatar & bot 

```ts
<User>.id // Returns the message creator discord id - String
<User>.username // Returns the message creator username - String
<User>.discriminator // Returns the message creator discirminator - String
<User>.avatar // Returns the URL for the message creator avatar - String
<User>.bot // Returns a boolean to determine if the message creator is a bot or a client - Boolean
```
Where the user class is being used: ```<Message>.author```, ```<Guild>.members``` (array) (will be deprecated soon) and ```<Member>.user```.
    
##### Channel Class
The channel attribute has 18 sub-attributes which store the channel id, type, guildID, position, permissionOverwrites, name, topic, nsfw, lastMessageID, bitrate, user limit, rate limit per user, recipients, icon, owner id, application id, parent id & last pin time stamp.
```ts
<Channel>.id // Returns the channel id as a string
<Channel>.type // Returns a number for the type of channel
<Channel>.guildId // Returns the guild id as a string
<Channel>.position // Returns the channel position, number (Could be null)
<Channel>.permissionOverwrites // array of overwrite objects	explicit permission overwrites for members and roles
<Channel>.name // Returns the name of the channel - String
<Channel>.topic // Returns the channel topic - String
<Channel>.nsfw // Returns a boolean if the channel is marked NSFW
<Channel>.lastMessageId // Returns the last message id of the channel - string
<Channel>.bitrate // Returns the bittrate in bits of the channel (voice) - Intenger
<Channel>.userLimit // Returns the user limit of the voice channel - Integer
<Channel>.rateLimitePerUser // Returns amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission manage_messages or manage_channel, are unaffected - Integer
<Channel>.recipients // Returns the recipents of the DM
<Channel>.icon // Returns the icon hash - String
<Channel>.ownerId // Returns the DM creator id - String
<Channel>.applicationId // Returns application id of the group DM creator if it is bot-created - String
<Channel>.parentId // Returns the id of the parent category for a channel (each parent category can contain up to 50 channels) - String
<Channel>.lastPinTimestamp // ISO8601 Format Returns the last pin timestamp of the current channel - String

<Channel>.send() // Takes a string or an object, if you pass an object it will assume you are sending an embed https://leovoel.github.io/embed-visualizer/
<Channel>.delete() // Deletes the current channel
```
Where the channel class is used: ```<Message>.channel``` and ```<Guild>.channels``` (array).
