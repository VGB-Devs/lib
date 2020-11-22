import Client from "../structures/Client.ts";
import Guild from "../structures/Guild.ts";
import Payload from '../structures/Payload.ts';
import Role from "../structures/Role.ts";

export default function(client: Client, payload: Payload) {
    let roles: Role[] = [];
    for(let i: number = 0; i < payload.d.roles.length; i++) {
        roles.push(new Role({
            id: payload.d.roles[i].id,
            name: payload.d.roles[i].name,
            color: payload.d.roles[i].color,
            hoist: payload.d.roles[i].hoist,
            position: payload.d.roles[i].position,
            permissions: payload.d.roles[i].permissions,
            managed: payload.d.roles[i].managed,
            mentionable: payload.d.roles[i].mentionable
        }))
    };
    let guild = new Guild({
        id: payload.d.id, 
        name: payload.d.name, 

        icon: payload.d.icon, 

        splash: payload.d.splash, 
        discoverySplash: payload.d.discovery_splash,

        ownerId: payload.d.owner_id,

        region: payload.d.region,
        afkChannelId: payload.d.afk_channel_id,
        afkTimeout: payload.d.afk_timeout,

        verificationLevel: payload.d.verification_level,
        defaultMessageNotifications: payload.d.default_message_notifications,
        explicitContentFilter: payload.d.explicit_content_filter,
        roles: roles,
        emojis: payload.d.emojis,
        features: payload.d.features,
        mfaLevel: payload.d.mfa_level,
        applicationId: payload.d.application_id,
        systemChannelId: payload.d.system_channel_id,
        systemChannelFlags: payload.d.system_channel_flags,
        rulesChannelId: payload.d.rules_channel_id,
        vanityUrlCode: payload.d.vanity_url_code,
        description: payload.d.description,
        banner: payload.d.banner,
        premiumTier: payload.d.premium_tier,
        preferredLocale: payload.d.preferred_locale,
        publicUpdatesChannelId: payload.d.public_updates_channel_id,
    
    })
    client.guilds.push(guild);
    client.emit("guildCreate", guild)
}