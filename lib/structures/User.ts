import { UserType } from './Interfaces.ts';

export default class User {
    private _id: string;
    private _username: string;
    private _discriminator: string;
    private _avatar: string;
    private _bot: boolean;

    constructor( user: UserType ) {
        this._id = user.id;
        this._username = user.username;
        this._discriminator = user.discriminator;
        this._avatar = user.avatar;
        this._bot = user.bot;
    }

    get id(): string { return this._id };
    get username(): string { return this._username; }
    get discriminator(): string { return this._discriminator };
    get avatar(): string { return this._avatar; }
    get bot(): boolean | undefined { return this._bot; }

}