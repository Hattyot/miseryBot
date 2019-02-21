const Discord = require("discord.js")
const embedMaker = require("../../modules/embed.js")
module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("BAN_MEMBERS")) return
    if(!args[0]) return embedMaker.command(message)

    let banMember = message.mentions.members.first() || message.guild.members.get(args[0])
    if(!banMember) {
        let regex = new RegExp(args[0])
        banMemberArray = message.guild.members.filter(_member => _member.user.username.toLowerCase().match(regex)).map(m => m.user.tag)
        if(banMemberArray) {

        }
    }
    let reason = args.slice(1).join(" ")

    if(!banMember) return embedMaker.command(message, "[user]")
    if(!reason) reason = "not given"
    if(message.member.highestRole.position <= banMember.highestRole.position) {
        return embedMaker.message(message, `You can't ban a user who has a higher or the same role as you`)
    }
    let embed = new Discord.RichEmbed()
        .setColor(bot.config[message.guild.id].embedColor)
        .setAuthor(`You have been banned`)
        .setDescription(`**Server:** ${message.guild.name}\n**Banned By:** <@${message.author.id}>\n**Reason:** ${reason}`)
        .setFooter(`Banned At:`)
        .setTimestamp()
    banMember.send(embed)
        .then(() => {return banMember.ban()})
        .catch(error => {console.log(error)})
}

module.exports.help = {
    name: "ban",
    cat: "Staff",
    description: "Ban a member",
    usage: `ban [user] (reason)`,
    examples: [`ban @Hattyot Stealing hearts and selling them on the black market`]
}

module.exports.conf = {
    enabled: false,
    aliases: [],
    cooldown: "3 Seconds"
};