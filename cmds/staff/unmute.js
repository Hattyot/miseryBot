const Discord = require("discord.js")
const embedMaker = require("../../modules/embed.js")
const { mute } = require("../../modules/data.js")
module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE)_CHANNELS")) return
    if(!args[0]) return embedMaker.command(message)

    let reason = args.slice(1).join(" ")
    let muteMember = getmuteMember()
    if(!muteMember) return embedMaker.command(message, "[user]")
    if(!reason) return embedMaker.command(message, "[reason]")

    mute.findOne({user_ID: muteMember.user.id}, (err, data) => {
        if(data) {
            if(muteMember.roles.has(muteRole)) {
                muteMember.removeRole(muteRole)
                mute.findOneAndDelete({user_ID: muteMember.user.id}, (err, data) => {
                    if(err) return console.log(err)
                })
                let embed2 = new Discord.RichEmbed()
                    .setAuthor(`You have been unmuted`)
                    .setDescription(`**Server:** *${message.guild.name}*\n**Unmuted By:** *<@${message.author.id}>*\n**Reason:** *${reason}*`)
                    .setColor(bot.config[message.guild.id].colors.green)
                    .setTimestamp()
                    .setFooter(`Unmuted At:`)
                muteMember.send(embed2)
                embedMaker.message(message, `<@${muteMember.user.id}> has been unmuted. Reason: **${reason}**`)
            }
        }
    })

    function getmuteMember() {
        let muteMember = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!muteMember && args[0]) {
            let regex = new RegExp(`(${args[0]})`, `i`)
            let members = message.guild.members.filter(m => m.user.tag.match(regex))
            if(members.size === 1) return members.first()
        }
        return muteMember
    }
}

module.exports.help = {
    name: "unmute",
    cat: "Staff - Moderation",
    description: "unmute a member",
    usage: `unmute [user] [reason]`,
    examples: [`unmute @Hattyot Oopse Doopsie`]
}

module.exports.conf = {
    enabled: true,
    aliases: [],
    cooldown: "3 Seconds"
};