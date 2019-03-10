const Discord = require("discord.js")
const embedMaker = require("../../modules/embed.js")
module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return
    if(!args[0]) return embedMaker.command(message)

    let warnMember = getWarnMember()
    let warning = args.slice(1).join(" ")

    if(!warnMember) return embedMaker.command(message, "[user]")
    if(!warning) return embedMaker.command(message, "[warning]")

    let embed = new Discord.RichEmbed()
        .setColor(bot.config[message.guild.id].colors.orange)
        .setAuthor(`You have been warned`)
        .setDescription(`**Server:** ${message.guild.name}\n**Warned By:** <@${message.author.id}>\n**Warning:** ${warning}`)
        .setFooter(`Warned At:`)
        .setTimestamp();
        warnMember.send(embed)
        embedMaker.message(message, `<@${warnMember.user.id}> has been warned. Warning: **${warning}**`)


    function getWarnMember() {
        let warnMember = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!warnMember && args[0]) {
            let regex = new RegExp(`(${args[0]})`, `i`)
            let members = message.guild.members.filter(m => m.user.tag.match(regex))
            if(members.size === 1) return members.first()
        }
        return warnMember
    }

}

module.exports.help = {
    name: "warn",
    cat: "Staff - Moderation",
    description: "warn a user",
    usage: `warn [user] [warning]`,
    examples: [`warn @Hattyot Stop Spamming`]
}

module.exports.conf = {
    enabled: true,
    aliases: [],
    cooldown: "3 Seconds"
};