const Discord = require("discord.js")
const embedMaker = require("../../modules/embed.js")
const { punishments } = require("../../modules/data.js")
const { punishmentsTools } = require("../../modules/tools.js")
module.exports.run = async (bot, message, args) => {
    if(!args[0]) return embedMaker.command(message)
    
    let kickMember = getKickMember()
    let reason = args.slice(1).join(" ")

    if(!kickMember) return embedMaker.command(message, "[user]")
    if(!reason) reason = "not given"

    let embed = new Discord.RichEmbed()
        .setColor(bot.config[message.guild.id].colors.orange)
        .setAuthor(`You have been kicked`)
        .setDescription(`**Server:** ${message.guild.name}\n**Kicked By:** <@${message.author.id}>\n**Reason:** ${reason}`)
        .setFooter(`Kicked At:`)
        .setTimestamp();
    kickMember.send(embed)
        .then(() => {

            punishments.find({user_ID: kickMember.user.id, type: `Warning`}, (err, data) => {
                embedMaker.message(message, `<@${kickMember.user.id}> has been kicked. Reason: **${reason}**\n\nThis user has been kicked **${data.length}** time(s) before.`)
                punishmentsTools.add(message.guild, kickMember.id, `Kick`, reason)
            })
            return kickMember.kick(`${reason}`)
        })


    function getKickMember() {
        let kickMember = message.mentions.members.first() || message.guild.members.get(args[0]);
        return kickMember
    }

}

module.exports.help = {
    name: "kick",
    cat: "Staff - Moderation",
    description: "kick a user",
    usage: `kick [user] (reason)`,
    examples: [`kick @Hattyot get out`]
}

module.exports.conf = {
    enabled: true,
    aliases: [],
    cooldown: "3 Seconds"
};
