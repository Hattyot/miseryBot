const Discord = require("discord.js")
const embedMaker = require("../../modules/embed.js")
module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("KICK_MEMBERS")) return

    let kickMember = message.mentions.members.first()
    let reason = args.slice(1).join(" ")

    if(!kickMember) return embedMaker.command(message, "[user]")
    if(!reason) reason = "not given"

    if(message.member.highestRole.position <= kickMember.highestRole.position) {
        return embedMaker.message(message, `You can't kick a user who has a higher or the same role as you`)
    }

    let embed = new Discord.RichEmbed()
        .setColor(bot.config[message.guild.id].embedColor)
        .setAuthor(`You have been kicked`)
        .setDescription(`**Server:** ${message.guild.name}\n**Kicked By:** <@${message.author.id}>\n**Reason:** ${reason}`)
        .setFooter(`Kicked At:`)
        .setTimestamp();
    kickMember.send(embed).then(() => {
        return kickMember.kick(`${reason}`)
    })

}

module.exports.help = {
    name: "kick",
    cat: "Staff",
    description: "kick a user",
    usage: `kick [user] (reason)`,
    examples: [`kick @Hattyot get out`]
}

module.exports.conf = {
    enabled: false,
    aliases: [],
    cooldown: "3 Seconds",
};