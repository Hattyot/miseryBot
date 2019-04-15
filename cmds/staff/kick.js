const Discord = require("discord.js")
const embedMaker = require("../../modules/embed.js")
const { punishments } = require("../../modules/data.js")
const { punishmentsTools } = require("../../modules/tools.js")
module.exports.run = async (bot, message, args) => {
    if(!args[0]) return embedMaker.command(message)
    
    let kickMember = message.mentions.members.first() || message.guild.members.get(args[0]);
    let reason = args.slice(1).join(" ")

    if(!kickMember) return embedMaker.command(message, "[user]")
    if(!reason) reason = "not given"
<<<<<<< HEAD
    if(message.member.highestRole.position <= kickMember.highestRole.position) {
        return embedMaker.message(message, `You can't kick a user who has a higher or the same role as you`)
    }
=======
>>>>>>> 98afb6d4e6206efc1f77718850c6f6c723ec7e5b

    let embed = new Discord.RichEmbed()
        .setColor(bot.config[message.guild.id].colors.orange)
        .setAuthor(`You have been kicked`)
        .setDescription(`**Server:** ${message.guild.name}\n**Kicked By:** <@${message.author.id}>\n**Reason:** ${reason}`)
        .setFooter(`Kicked At:`)
        .setTimestamp();

    kickMember.send(embed)
        .then(() => {
            punishments.find({user_ID: kickMember.user.id, type: `Kick`}, (err, data) => {
                embedMaker.message(message, `<@${kickMember.user.id}> has been kicked. Reason: **${reason}**\n\nThis user has been kicked **${data.length}** time(s) before.`)
                punishmentsTools.add(message.guild, kickMember.id, `Kick`, reason)
            })
            return kickMember.kick(`${reason}`)
        })
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
