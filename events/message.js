const Discord = require("discord.js");
const { huntWinners, points } = require("../modules/data.js")
module.exports = async (bot, message) => {
    if(message.channel.type === "dm") return
    if(message.author.bot) return;
    if(message.type === `PINS_ADD`) return message.delete()
    let messageArray = message.content.replace(/ +(?= )/g, "").split(" ");
    let command = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    let cmd = bot.commands.get(command.slice(bot.config[message.guild.id].prefix.length)) || bot.commands.get(bot.aliases.get(command.slice(bot.config[message.guild.id].prefix.length)))

    if(cmd) {
        if(!cmd.conf.enabled) return
        if(bot.user.id === "548436033390379008" && !cmd.conf.test) return
        if(/Staff/i.test(cmd.help.cat) && !message.member.roles.has("530728428975161344")) return

        if(message.content.startsWith(bot.config[message.guild.id].prefix)) {
            await cmd.run(bot, message, args);
        }
    }else {
        if(message.channel.id === "549186081007075328" && !message.member.roles.has("530728428975161344")) message.delete()
        if(message.content.toLowerCase() === "%%open") return message.delete()
        
    }
};
