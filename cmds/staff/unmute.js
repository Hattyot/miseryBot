const Discord = require("discord.js")
const embedMaker = require("../../modules/embed.js")
const { mute } = require("../../modules/data.js")
module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return
    if(!args[0]) return embedMaker.command(message)

    let reason = args.slice(1).join(" ")
    let muteMember = message.mentions.members.first() || message.guild.members.get(args[0]);
    let muteRole = message.guild.roles.get(bot.config[message.guild.id].muteRoleID)

    if(!muteMember) return embedMaker.command(message, "[user]")
    if(!reason) return embedMaker.command(message, "[reason]")

    mute.findOne({user_ID: muteMember.user.id}, (err, data) => {
        if(!data) return embedMaker.message(message, `This user isn't muted`)
        
        let embed2 = new Discord.RichEmbed()
            .setAuthor(`You have been unmuted`)
            .setDescription(`**Server:** *${message.guild.name}*\n**Unmuted By:** *<@${message.author.id}>*\n**Reason:** *${reason}*`)
            .setColor(bot.config[message.guild.id].colors.green)
            .setTimestamp()
            .setFooter(`Unmuted At:`)

        embedMaker.message(message, `<@${muteMember.user.id}> has been unmuted. Reason: **${reason}**`)
        muteMember.send(embed2)
        muteMember.removeRole(muteRole)
        
        mute.findOneAndDelete({user_ID: muteMember.user.id}, (err, data) => {
            if(err) return console.log(err)
        })
    })
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