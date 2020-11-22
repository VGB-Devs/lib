import Client from "../structures/Client.ts";
import Payload from '../structures/Payload.ts';
import Channel from "../structures/Channel.ts";

export default function(client: Client, payload: Payload) {
    client.emit("channelCreate", new Channel({id: payload.d.id, type: payload.d.type, guildId: payload.d.guild_id, guild: client.guilds.find(x=>x.id===payload.d.guild_id)}, client));
}