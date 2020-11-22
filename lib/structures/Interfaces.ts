import Channel from './Channel.ts';
import User from './User.ts';
import Guild from "./Guild.ts";
import Role from "./Role.ts";

export interface UserType {
    id: string,
    username: string,
    discriminator: string,
    avatar: string,
    bot: boolean
}

export interface MemberType {
    user?: User,
    nickname: string,
    roles: string[],
    joinedAt: string,
    premiumSince?: string | undefined,
    deaf: boolean,
    mute: boolean,
}

export interface ChannelType {
    id: string,
    type: number,
    guild?: Guild,
    guildId?: string,
}

export interface RoleType {
    id: string,
    name: string,
    color: number,
    hoist: boolean,
    position: number,
    permissions: string,
    managed: boolean,
    mentionable: boolean,
}

export interface MessageType {
    id: string,
    content: string,
    channel: ChannelType,
    author: UserType,
    member?: MemberType,
    guild: boolean,
}


export interface GuildType {
    id: string,
    name: string,
    icon: string | undefined,
    iconHash?:	string | undefined,
    splash: string | undefined,
    discoverySplash: string | undefined,
    owner?: boolean,
    ownerId: string,
    permissions?: string,
    region: string,
    afkChannelId: string | undefined,
    afkTimeout: number,
    widgetEnabled?: boolean,
    widgetChannelId?: string | undefined,
    verificationLevel: number,
    defaultMessageNotifications: number,
    explicitContentFilter: number,
    roles:	Role[],
    emojis: object[],
    features: object[],
    mfaLevel: number,
    applicationId: string | undefined,
    systemChannelId: string | undefined,
    systemChannelFlags: number,
    rulesChannelId: string | undefined,
    joinedAt?: string,
    large?: boolean,
    unavailable?:	boolean,
    memberCount?: number,
    voiceStates?: object[],
    members?: User[],
    channels?: Channel[],
    presences?: object[],
    maxPresences?: number,
    maxMembers?	: number,
    vanityUrlCode: string | undefined,
    description: string | undefined,
    banner: string	| undefined,
    premiumTier: number,
    premiumSubscriptionCount?: number,
    preferredLocale: string,
    publicUpdatesChannelId: string | undefined,
    maxVideoChannelUsers?:	number,
    approximateMemberCount?: number,
    approximatePresenceCount?: number,
}