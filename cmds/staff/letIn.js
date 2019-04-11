const Discord = require("discord.js")
const embedMaker = require("../../modules/embed.js")
module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("BAN_MEMBERS")) return
    if(!args[0]) return embedMaker.command(message)

    let member = message.guild.members.get(args[0])
    if(!member) return embedMaker.command(message, '[userID]')
    let potatoRole = message.guild.roles.get(r => r.name.toLowerCase() === "sentient potato")
    
    member.addRole(potatoRole)
}

module.exports.help = {
    name: "letin",
    cat: "Staff - Moderation",
    description: "Let a person into the server",
    usage: `letin [userID]`,
    examples: [`letin 329454378573496456`]
}

module.exports.conf = {
    enabled: true,
    aliases: [],
    cooldown: "3 Seconds"
};
