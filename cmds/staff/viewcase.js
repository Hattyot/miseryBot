const Discord = require("discord.js");
const embedMaker = require("../../modules/embed.js")
const ms = require("../../modules/ms.js")
const moment = require("moment");
const { punishments } = require("../../modules/data.js")
module.exports.run = async (bot, message, args) => {
    if(!args[0]) return embedMaker.command(message)
    punishments.findOne({caseNumber: args[0]}, (err, data) => {
        if(!data) {
            return embedMaker.command(message, "[case number]")
        }else {
            let member = message.guild.members.get(data.user_ID)
            let type = data.type
            let msg = data.message
            let date = moment.utc(data.time).format("ddd, MMM Do YYYY, HH:mm");
            let caseNumber = data.caseNumber
            let ago =  ms(Date.now() - date)
            let embed = new Discord.RichEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL)
                .setColor(bot.config[message.guild.id].colors.default)
                .setDescription(`**Member: <@${member.user.id}> (${member.user.id})**\n**Action:** ${type}\n**Reason:** ${msg}\n**Action Date:** ${date} (${ago} ago)`)
                .setThumbnail()
                .setFooter(`Case #${caseNumber}`)

        }
    })
};

module.exports.help = {
    name: "viewCase",
    cat: "Staff - Info",
    description: "view a specific case",
    usage: "viewCase [case number]",
    examples: ["viewCase 53"]
};

module.exports.conf = {
    enabled: true,
    aliases: []
};
