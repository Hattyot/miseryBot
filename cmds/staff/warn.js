const Discord = require("discord.js")
const embedMaker = require("../../modules/embed.js")
const { warnings } = require("../../modules/data.js")
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
        .setDescription(`**Server:** ${message.guild.name}\n**Warning:** ${warning}`)
        .setFooter(`Warned At:`)
        .setTimestamp();
        
    warnMember.send(embed)
    warnings.find({user_ID: warnMember.user.id}, (err, data) => {
        embedMaker.message(message, `<@${warnMember.user.id}> has been warned. Warning: **${warning}**\n\nCurrently the user has **${data.length + 1}** warning(s)`)
        let newWarning = new warnings({
            user_ID: `${message.author.id}`,
            warning: warning,
            warnTime: Date.now()
        });
        newWarning.save()
            .then(r => console.log(r))
            .catch(e => console.log(e));
    })

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