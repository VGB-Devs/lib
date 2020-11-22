import Client from '../structures/Client.ts';
import Payload from '../structures/Payload.ts';
import Message from '../structures/Message.ts';

export default function(client: Client, payload: Payload) {
    if(!payload.d.author) return;
    client.emit("msgEdit", new Message({ 
        id: payload.d.id, 
        content: payload.d.content, 
        guild: payload.d.type === 0 ? true : false,
        channel: { 
            id: payload.d.channel_id, 
            type: payload.d.type, 
            guildId: payload.d.guild_id 
        }, 
        author: { 
            id: payload.d.author.id, 
            username: payload.d.author.username, 
            avatar: payload.d.author.avatar, 
            bot: payload.d.author.bot, 
            discriminator: payload.d.author.discriminator 
        },
        member: {
            nickname: payload.d.member.nick,
            roles: payload.d.member.roles,
            joinedAt: payload.d.member.joined_at,
            deaf: payload.d.member.deaf,
            mute: payload.d.member.mute,
        }
    }, client));
}