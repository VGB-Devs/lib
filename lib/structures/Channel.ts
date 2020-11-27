import { ChannelType } from './Interfaces.ts'
import User from './User.ts';
import { Constants } from "../constants/Constants.ts";
import Message from "./Message.ts";
import Guild from "./Guild.ts";
import Client from './Client.ts';

export default class Channel {
    private _id: string;	                                    //the id of this channel
    private _type: number;                                      //the type of channel
    private _guildId?: string;                                  //the id of the guild
    private _position?: number;                                 //sorting position of the channel
    private _permissionOverwrites?: object[];/*?*/	            //array of overwrite objects	explicit permission overwrites for members and roles
    private _name?: string;	                                    //the name of the channel (2-100 characters)
    private _topic?: string;	                                //the channel topic (0-1024 characters)
    private _nsfw?: boolean;	                                //whether the channel is nsfw
    private _lastMessageId?: string;                	        //the id of the last message sent in this channel (may not point to an existing or valid message)
    private _bitrate?: number;	                                //the bitrate (in bits) of the voice channel
    private _userLimit?: number;       	                        //the user limit of the voice channel
    private _rateLimitPerUser?: number;                         //amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission manage_messages or manage_channel, are unaffected
    private _recipients?: User[];                      	        //the recipients of the DM
    private _icon?: string;	                                    //icon hash
    private _ownerId?: string                      	            //id of the DM creator
    private _applicationId?: string	                            //application id of the group DM creator if it is bot-created
    private _parentId?: string;                     	        //id of the parent category for a channel (each parent category can contain up to 50 channels)
    private _lastPinTimestamp?: string /*ISO8601 timestamp*/    //when the last pinned message was pinned. This may be null in events such as GUILD_CREATE when a message is not pinned.

    private _guild?: Guild;
    private _client: Client;
    constructor(data: ChannelType, client: Client) {
        this._client = client;
        this._id = data.id;
        this._type = data.type;
        this._guildId = data.guildId;
        this._guild = client.guilds.find(x => x.id === this.guildId)
    }
    
    get id(): string { return this._id; }
    get type(): number { return this._type; }
    get guildId(): string | undefined { return this._guildId; }
    get position(): number | undefined { return this._position; }
    get permissionOverwrites(): object[] /*?*/ | undefined { return this._permissionOverwrites };
    get name(): string | undefined { return this._name; }
    get topic(): string | undefined { return this._topic; }
    get nsfw(): boolean | undefined { return this._nsfw; }
    get lastMessageId(): string | undefined { return this._lastMessageId; }
    get bitrate(): number | undefined { return this._bitrate; }
    get userLimit(): number | undefined { return this._userLimit; }
    get rateLimitPerUser(): number | undefined { return this._rateLimitPerUser; }
    get recipients(): User[] | undefined { return this._recipients; }
    get icon(): string | undefined { return this._icon; }
    get ownerId(): string | undefined { return this._ownerId; }
    get applicationId(): string | undefined { return this._applicationId; }
    get parentId(): string | undefined { return this._parentId; }
    get lastPinTimestamp(): string | undefined { return this._lastPinTimestamp; }
    get guild(): Guild | undefined { return this._guild; }
    
    async send(content: any) {
        /*============================================================================================
        we need a way of getting the previous message's sender's author and member object: to be fixed
        ============================================================================================*/
        let data:object = {};
        let embed: Boolean;
        if (typeof content === 'object' && content !== null) {
            data = { "embed": content, "tts": false };
            embed = true;
        } else {
            data = { "content": content, "tts": false };
            embed = false;
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bot ${this._client.token}`
        }
        const response = await fetch(`${Constants.API}/channels/${this.id}/messages`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });
    
        const json = await response.json();
        if(json.message! == "You are being rate limited.") return;
        if (!embed) { 
            console.log(json);
           
            return new Message({ 
                id: json.id, 
                content: content, 
                guild: this.type === 0 ? true : false,
                channel: { 
                    id: this.id, 
                    type: json.type, 
                    guildId: this.guildId, 
                    guild: this.guild 
                }, 
                author: { 
                    id: json.author.id, 
                    username: json.author.username, 
                    discriminator: json.author.discriminator, 
                    bot: json.author.bot, 
                    avatar: json.author.avatar
                },
                member: {
                    nickname: "null",
                    roles: [],
                    joinedAt: "",
                    deaf: false,
                    mute: false,
                }, //DOESN'T WORK ^^ (json doesn't return a member class): gotta fix
            }, this._client);
        }
        return json
    }
    async delete() {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bot ${this._client.token}`
        }
        const response = await fetch(`${Constants.API}/channels/${this.id}`, {
            method: 'DELETE',
            headers
        })
        return response;
    }
}