import { Constants } from '../constants/Constants.ts';
import User from "./User.ts";
import { MessageType } from './Interfaces.ts';
import Channel from "./Channel.ts";
import Client from './Client.ts'
import Member from "./Member.ts";

export default class Message {
    private _content: string;
    private _id: string;
    private _channel: Channel;
    private _author: User;
    private _member?: Member | undefined;
    private _client: Client;
    private _guild: boolean;
    constructor(data: MessageType, client: Client) {
        this._content = data.content;
        this._id = data.id;
        this._author = new User(data.author);
        this._channel = new Channel(data.channel, client);
        this._member = data.member ? new Member(data.member) : undefined;
        this._client = client;
        this._guild = data.guild;
        this.member!.roles.forEach(role=>this.member!.realRoles.push(this.channel.guild!.roles.filter(x=>x.id === role)[0]));
    }

    async delete() {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bot ${this._client.token}`
        }
        const response = await fetch(`${Constants.API}/channels/${this.channel.id}/messages/${this.id}`, {
            method: 'DELETE',
            headers
        })
        return response;
    }

    get content(): string { return this._content; }
    get id(): string { return this._id; }
    get guild(): boolean { return this._guild; }
    get author(): User { return this._author; }
    get channel(): Channel { return this._channel; }
    get member(): Member | undefined { return this._member; }
}