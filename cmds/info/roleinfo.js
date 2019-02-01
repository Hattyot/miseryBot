const Discord = require("discord.js")
const moment = require("moment")
const embedMaker = require("../../modules/embed.js")
module.exports.run = async (bot, message, args) => {
    let roleName = args.join(" ").toLowerCase()

    if (!roleName) {
        let serverRoles = message.guild.roles.filter(role => role.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ")

        embedMaker.message(message, `${serverRoles || "No Roles"}`, {
            author: "Roles",
            aIcon: bot.icons[message.guild.id]
        })
    } else {
        let role = message.guild.roles.filter(role => role.name.toLowerCase() === roleName).first() || message.guild.roles.get(args[0]) || message.guild.roles.filter(role => role.name.toLowerCase().indexOf(roleName) != -1).first()
        let embed = new Discord.RichEmbed()
            .setColor(bot.config[message.guild.id].embedColor)
            .setAuthor(role.name, bot.icons[message.guild.id])
            .addField("Name:", `<@&${role.id}>`, true)
            .addField("ID:", role.id, true)
            .addField("Created At:", `${moment.utc(role.createdAt).format("ddd, MMM Do YYYY, HH:mm")} UTC`, false)
            .addField("Color:", `Hex: ${role.hexColor}`, true)
            .addField("Members:", `Total: ${role.members.size}`, true)
            .addField("Position:", `${message.guild.roles.size - role.position}/${message.guild.roles.size}\nHoisted: ${role.hoist}`, true)
            .setTimestamp()
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL)
        message.channel.send({embed});
    }
}

module.exports.help = {
    name: "roleinfo",
    cat: "Info",
    description: "Get info about a role",
    usage: `roleinfo [role]`,
    examples: [`roleinfo Muted`, `roleinfo 469146366078222337`]
}

module.exports.conf = {
    enabled: true,
    aliases: []
};