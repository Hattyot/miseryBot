let imcooldown = new Set()
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

        if(message.content.startsWith(prefix)) return cmd.run(bot, message, args);
    }else {
        if(message.channel.id === "557271522394505247") return
        if(message.channel.id === "524023670507569152") return
        if (imcooldown.has("0")) return
        let args2 = message.content.toLowerCase().split(".")
        if(args2[0].startsWith("i'm ")) {
            sendMsg("i'm")
        }else if(args2[0].startsWith("im ")) {
            sendMsg("im")
        }else if(args2[0].startsWith("i am ")) {
            sendMsg("i am")
        }

        function sendMsg(pre) {
            message.channel.send(`Hi ${args2[0].replace(`${pre} `, "")}, I'm dad.`)
            imcooldown.add("0")
            setTimeout(() => {
                imcooldown.delete("0")
            }, 1800000) 
        }
    }
};
