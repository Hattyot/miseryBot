module.exports = async (bot, message) => {
    if(message.channel.type === "dm") return
    if(message.author.bot) return;
    if(message.type === `PINS_ADD`) return message.delete()

    let prefix = bot.config[message.guild.id].prefix
    let messageArray = message.content.replace(/ +(?= )/g, "").split(" ");
    let command = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    let cmd = bot.commands.get(command.slice(prefix.length)) || bot.commands.get(bot.aliases.get(command.slice(prefix.length)))
    
    if(cmd) {
        if(!cmd.conf.enabled) return
        if(/Staff/i.test(cmd.help.cat) && !message.member.roles.has("530728428975161344")) return

        if(message.content.startsWith(prefix)) return cmd.run(bot, message, args);
    }
};
