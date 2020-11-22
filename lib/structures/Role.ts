import { RoleType } from './Interfaces.ts';

export default class Role {
    private _id: string	            //role id
    private _name:	string	        //role name
    private _color: number	        //integer representation of hexadecimal color code
    private _hoist: boolean	        //if this role is pinned in the user listing
    private _position: number	    //position of this role
    private _permissions: string	//permission bit set
    private _managed: boolean	    //whether this role is managed by an integration
    private _mentionable: boolean	//whether this role is mentionable
    constructor(data: RoleType) {
        this._id = data.id;
        this._name = data.name;
        this._color = data.color;
        this._hoist = data.hoist;
        this._position = data.position;
        this._permissions = data.permissions;
        this._managed = data.managed;
        this._mentionable = data.mentionable;
    }

    get id(): string { return this._id; }
    get name(): string { return this._name; }
    get color(): number { return this._color; }
    get hoist(): boolean { return this._hoist; }
    get position(): number { return this._position; }
    get permissions(): string { return this._permissions; }
    get managed(): boolean { return this._managed; }
    get mentionable(): boolean { return this._mentionable; }
}