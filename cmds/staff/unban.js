const Discord = require("discord.js")
const embedMaker = require("../../modules/embed.js")
module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE)_CHANNELS")) return
    if(!args[0]) return embedMaker.command(message)

    message.guild.fetchBans().then(bans => {
        let banMember = bans.get(args[0])
        if(!banMember) {
            let banMember = bans.filter(m => `${m.username}#${m.discriminator}` === args[0]).first()
            if(!banMember) return embedMaker.command(message, "[user]")
        }else {
            let reason = args.slice(1).join(" ")
            if(!reason) return embedMaker.command(message, "[reason]")
        
            embedMaker.message(message, `<@${banMember.user.id}> has been unbanned. Reason: **${reason}**`)
            return message.guild.unban(banMember.user.id, reason)
        }
    })
}

module.exports.help = {
    name: "unban",
    cat: "Staff - Moderation",
    description: "unban a member",
    usage: `unban [user] [reason]`,
    examples: [`unban @Hattyot Oopse Doopsie`]
}

module.exports.conf = {
    enabled: true,
    aliases: [],
    cooldown: "3 Seconds"
};