const Discord = require("discord.js");
const moment = require("moment");
module.exports.run = async (bot, message, args) => {
    let user = message.mentions.users.first();
    if(!user) user = message.author;

        let member = message.guild.members.get(user.id);
        let roles = member.roles.map(r => `<@&${r.id}>`).join(" ").replace(`<@&${message.guild.id}>`, "");
        let rolenum = Math.floor(member.roles.size) - 1;
        let perms = [];
        let status = user.presence.status;
        let joined = moment.utc(message.member.joinedAt).format("ddd, MMM Do YYYY, HH:mm");
        let registered = moment.utc(user.createdAt).format("ddd, MMM Do YYYY, HH:mm");
        let permissions = {
            "ADMINISTRATOR": "Administrator",
            "MANAGE_GUILD": "Manage Server",
            "MANAGE_ROLES": "Manage Roles",
            "MANAGE_CHANNELS": "Manage Channels",
            "BAN_MEMBERS": "Ban Members",
            "KICK_MEMBERS": "Kick Members",
            "MANAGE_NICKNAMES": "Manage Nicknames",
            "MANAGE_EMOJIS": "Manage Emojis",
            "MANAGE_WEBHOOKS": "Manage Webhooks",
            "MANAGE_MESSAGES": "Manage Messages",
            "MENTION_EVERYONE": "Mention Everyone",
            "MUTE_MEMBERS": "VC Mute Members",
            "DEAFEN_MEMBERS": "VC Deafen Members",
            "MOVE_MEMBERS": "VC Move Members"
        };

        if(roles.length === 0) roles = "No roles";
        if(member.hasPermission("ADMINISTRATOR")) {
            member.user.id === message.guild.owner.user.id ? perms.push("Owner 👑") : perms.push("Administrator")
        }else {
        for(let key in permissions) {
            if(permissions.hasOwnProperty(key)) {
                if(member.hasPermission(key)) {
                    perms.push(permissions[key])
                }
            }
        }
    }
    let embed = new Discord.RichEmbed()
        .setAuthor(`${user.username}#${user.discriminator}`, user.displayAvatarURL)
        .setThumbnail(user.displayAvatarURL)
        .setDescription(`${member}`)
        .addField("Status",`${status}`,true)
        .addField("Joined",`${joined}`,true)
        .addField("Registered", `${registered}`)
        .addField(`Roles [${parseInt(rolenum)}]`, `${roles}`)
        .addField(`Permissions`, `${perms.join(", ") || "None"}`)
        .setColor(bot.config.embedColor)
        .setTimestamp()
        .setFooter(`ID: ${user.id}`);
    return message.channel.send(embed)
};

module.exports.help = {
    name: "userinfo",
    description: "Get userinfo about yourself or another user",
    usage: `userinfo (user)`,
    examples: [`userinfo`, `userinfo @Hattyot`]
};

module.exports.conf = {
    enabled: true,
    aliases: [],
    cooldown: "3 Seconds",
    cat: "Info"
  };