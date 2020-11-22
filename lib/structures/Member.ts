import User from "./User.ts";
import Role from './Role.ts';
import { MemberType } from './Interfaces.ts';

export default class Member {
    private _user?: User;
    private _nickname: string;
    private _roles: string[];
    private _joinedAt: string;
    private _deaf: boolean;
    private _mute: boolean;
    private _realRoles: Role[];
    constructor(data: MemberType) {
        this._user = data.user;
        this._nickname = data.nickname;
        this._roles = data.roles;
        this._joinedAt = data.joinedAt;
        this._deaf = data.deaf;
        this._mute = data.mute;
        this._realRoles = [];
    }

    get user(): User | undefined { return this._user; }
    get nickname(): string { return this._nickname; }
    get roles(): string[] { return this._roles; }
    get joinedAt(): string { return this._joinedAt; }
    get deaf(): boolean { return this._deaf; }
    get mute(): boolean { return this._mute; }
    get realRoles(): Role[] { return this._realRoles; }
    set roles(roles: string[]) { this._roles = roles; }
}