const Discord = require("discord.js")
const embedMaker = require("../../modules/embed.js")
module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("BAN_MEMBERS")) return
    if(!args[0]) return embedMaker.command(message)

    let banMember = message.mentions.members.first() || message.guild.members.get(args[0]);
    let reason = args.slice(1).join(" ")

    if(!banMember) return embedMaker.command(message, "[user]")
    if(!reason) return embedMaker.command(message, "[reason]")
    if(message.member.highestRole.position <= banMember.highestRole.position) {
        return embedMaker.message(message, `You can't ban a user who has a higher or the same role as you`)
    }

    let embed = new Discord.RichEmbed()
        .setColor(bot.config[message.guild.id].colors.red)
        .setAuthor(`You have been banned`)
        .setDescription(`**Server:** ${message.guild.name}\n**Banned By:** <@${message.author.id}>\n**Reason:** ${reason}`)
        .setFooter(`Banned At:`)
        .setTimestamp()
        
    banMember.send(embed)
        .then(() => {
            embedMaker.message(message, `<@${banMember.user.id}> has been banned. Reason: **${reason}**`)
            return banMember.ban({reason: reason})
         })
        .catch(error => {console.log(error)})
}

module.exports.help = {
    name: "ban",
    cat: "Staff - Moderation",
    description: "Ban a member",
    usage: `ban [user] [reason]`,
    examples: [`ban @Hattyot Stealing hearts and selling them on the black market`]
}

module.exports.conf = {
    enabled: true,
    aliases: [],
    cooldown: "3 Seconds"
};