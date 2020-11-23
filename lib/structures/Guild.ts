import Channel from './Channel.ts';
import User from './User.ts';
import { GuildType } from "./Interfaces.ts";
import Role from "./Role.ts";
import { Member } from '../../mod.ts';

export default class Guild {
    private _id: string;              	                                            //guild id
    private _name: string;	                                                        //guild name (2-100 characters, excluding trailing and leading whitespace)
    private _icon: string | undefined;	                                            //icon hash
    private _iconHash?:	string | undefined;	                                        //icon hash, returned when in the template object
    private _splash: string | undefined;	                                        //splash hash
    private _discoverySplash: string | undefined;	                                //discovery splash hash; only present for guilds with the "DISCOVERABLE" feature
    private _owner?: boolean;     	                                                //true if the user is the owner of the guild
    private _ownerId: string;	                                                    //id of owner
    private _permissions?: string;	                                                //total permissions for the user in the guild (excludes overrides)
    private _region: string;	                                                    //voice region id for the guild
    private _afkChannelId: string | undefined;                                      //id of afk channel
    private _afkTimeout: number;                                                    //afk timeout in seconds
    private _widgetEnabled?: boolean;	                                            //true if the server widget is enabled
    private _widgetChannelId?: string | undefined;	                                //the channel id that the widget will generate an invite to, or null if set to no invite
    private _verificationLevel: number;  	                                        //verification level required for the guild
    private _defaultMessageNotifications: number;                                   //default message notifications level
    private _explicitContentFilter: number;   	                                    //explicit content filter level
    private _roles:	Role[];                                                         //roles in the guild
    private _emojis: object[]; /*TODO: Emoji Object*/                               //custom guild emojis
    private _features: object[]; /*Guild Feature Object?*/                          //enabled guild features
    private _mfaLevel: number;	                                                    //required MFA level for the guild
    private _applicationId: string | undefined;	                                    //application id of the guild creator if it is bot-created
    private _systemChannelId: string | undefined;	                                //the id of the channel where guild notices such as welcome messages and boost events are posted
    private _systemChannelFlags: number;	                                        //system channel flags
    private _rulesChannelId: string | undefined;	                                //the id of the channel where Community guilds can display rules and/or guidelines
    private _joinedAt?: string;	/*ISO8601 timestamp*/                               //when this guild was joined at
    private _large?: boolean;	                                                    //true if this is considered a large guild
    private _unavailable?:	boolean;                                                //true if this guild is unavailable due to an outage
    private _memberCount?: number;	                                                //total number of members in this guild
    private _voiceStates?: object[]; /*partial voice state object array (todo?)*/	//states of members currently in voice channels; lacks the guild_id key
    private _members?: Member[]; /*TODO: Member Object*/                              //users in the guild
    private _channels?: Channel[];	                                                //channels in the guild
    private _presences?: object[];	/*TODO: partial presence update object*/	    //presences of the members in the guild, will only include non-offline members if the size is greater than large threshold
    private _maxPresences?: number;	                                                //the maximum number of presences for the guild (the default value, currently 25000, is in effect when null is returned)
    private _maxMembers?	: number;                                               //the maximum number of members for the guild
    private _vanityUrlCode: string | undefined;	                                    //the vanity url code for the guild
    private _description: string | undefined;	                                    //the description for the guild, if the guild is discoverable
    private _banner: string	| undefined;                                            //banner hash
    private _premiumTier: number;                                                	//premium tier (Server Boost level)
    private _premiumSubscriptionCount?: number;		                                //the number of boosts this guild currently has
    private _preferredLocale: string;	                                            //the preferred locale of a Community guild; used in server discovery and notices from Discord; defaults to "en-US"
    private _publicUpdatesChannelId: string | undefined;	                        //the id of the channel where admins and moderators of Community guilds receive notices from Discord
    private _maxVideoChannelUsers?:	number;	                                        //the maximum amount of users in a video channel
    private _approximateMemberCount?: number;	                                    //approximate number of members in this guild, returned from the GET /guild/<id> endpoint when with_counts is true
    private _approximatePresenceCount?: number;	                                    //approximate number of non-offline members in this guild, returned from the GET /guild/<id> endpoint when with_counts is true
    constructor(data: GuildType) {
        /*======================================================
        ONLY IMPLEMENTING NECESSARY PROPERTIES, DO NOT REFORMAT.
        ======================================================*/
        this._id = data.id;
        this._name = data.name;

        this._ownerId = data.ownerId;

        this._region = data.region;

        this._afkTimeout = data.afkTimeout;

        this._verificationLevel = data.verificationLevel;
        this._defaultMessageNotifications = data.defaultMessageNotifications;
        this._explicitContentFilter = data.explicitContentFilter;
        this._roles = data.roles;
        this._emojis = data.emojis;
        this._features = data.features;
        this._mfaLevel = data.mfaLevel;

        this._systemChannelFlags = data.systemChannelFlags;

        this._premiumTier = data.premiumTier;
        
        this._preferredLocale = data.preferredLocale;
    }

    getRoleById(id: string): Role | undefined {
        for(let i = 0; i < this.roles.length; i++) {
            if(this.roles[i].id === id) return this.roles[i];
        }
        return;
    }
    get id(): string { return this._id; }
    get name(): string { return this._name; }

    get ownerId(): string { return this._ownerId; }

    get region(): string { return this._region; }

    get afkTimeout(): number { return this._afkTimeout; }
    
    get verificationLevel(): number { return this._verificationLevel; }
    get defaultMessageNotifications(): number { return this._defaultMessageNotifications; }
    get explicitContentFilter(): number { return this._explicitContentFilter; }
    get roles(): Role[] /*TODO: Role Object*/ { return this._roles; }
    get emojis(): object[] /*TODO: Emoji Object*/ { return this._emojis; }
    get features(): object[] /*TODO: Guild Feature Object*/ { return this._emojis; }
    get mfaLevel(): number { return this._mfaLevel; }

    get systemChannelFlags(): number { return this._systemChannelFlags; }

    get premiumTier(): number { return this._premiumTier; }

    get preferredLocale(): string { return this._preferredLocale; }

    
}