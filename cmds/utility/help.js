const Discord = require("discord.js");
const embedMaker = require("../../modules/embed.js")
module.exports.run = async (bot, message, args) => {
    let prefix = bot.config[message.guild.id].prefix
    let commands = bot.commands
    let categories = remove_same(commands.map(cmd => cmd.help.cat)).sort()

    if(args[0]){
        let command = bot.commands.get(args[0].toLowerCase())
        if(!command) return embedMaker.message(message, "That's not a valid command.")

        let name = command.help.name
        let description = command.help.description
        let usage = command.help.usage
        let examples = command.help.examples.join(`\n${bot.config[message.guild.id].prefix}`);

        let embed = new Discord.RichEmbed()
            .setColor(bot.config[message.guild.id].colors.default)
            .setTitle(`Command: ${bot.config[message.guild.id].prefix}${name}`)
            .setDescription(`**Description:** ${description}\n**Usage:** ${prefix}${usage}\n**Examples:**\n${prefix}${examples}`);
        message.channel.send(embed)
    }else {
        let helpEmbed = new Discord.RichEmbed()
            .setTitle("**>Commands**")
            .setDescription(`A list of available commands.\nFor additional info on a command, type \`${prefix}help [command]\``)
            .setColor(bot.config[message.guild.id].colors.default);

        for(j = 0; j < categories.length; j++) {
            if(categories[j] === "Dev") continue;
            if(categories[j].match(/(Staff)/i)) continue;
            
            let cmds = commands.filter(c => c.help.cat === categories[j] && c.conf.enabled);
            let cmdNames = cmds.map(c => `\`${c.help.name}\``);

            helpEmbed.addField(`>${categories[j]}`, cmdNames.join(" **|** "))
        }
        
        message.channel.send(helpEmbed)
    }

};

module.exports.help = {
    name: "help",
    cat: "Utility",
    description: "Help yoself",
    usage: "help [command]",
    examples: ["help time", "help magik"]
};

module.exports.conf = {
    enabled: true,
    aliases: []
};

function remove_same(array1) {
    let result = []
    for(let i = 0; i < array1.length; i++) {
        if(result.indexOf(array1[i]) > -1) continue
        result.push(array1[i])
    }
    return result
}
