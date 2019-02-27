const Discord = require("discord.js");
const embedMaker = require("../../modules/embed.js")
module.exports.run = async (bot, message, args) => {
    let commands = bot.commands.filter(cmd => cmd.help.cat.match(/Staff/i))
    let cats = commands.map(cmd => cmd.help.cat)

    function remove_same(array1) {
        let result = []
        for(let i = 0; i < array1.length; i++) {
            if(result.indexOf(array1[i]) > -1) continue
            result.push(array1[i])
        }
        return result
    }

    let categories = remove_same(cats).sort()

    if(args[0]){
        let command = commands.get(args[0])
        if(!command) return embedMaker.message(message, "That's not a valid command.")
        let name = command.help.name
        let description = command.help.description
        let usage = command.help.usage
        let examples = command.help.examples.join(`\n${bot.config[message.guild.id].prefix}`);
        let exampleText;
        command.help.examples.length > 0 ? exampleText = "Examples" : exampleText = "Example"
        let embed = new Discord.RichEmbed()
            .setColor(bot.config[message.guild.id].colors.default)
            .setTitle(`Command: ${bot.config[message.guild.id].prefix}${name}`)
            .setDescription(`**Description:** ${description}\n**Usage:** ${bot.config[message.guild.id].prefix}${usage}\n**${exampleText}:**\n${bot.config[message.guild.id].prefix}${examples}`);
        message.channel.send(embed)
    }else {
        let helpEmbed = new Discord.RichEmbed()
            .setTitle("**>Staff Commands**")
            .setDescription(`A list of available commands.\nFor additional info on a command, type \`${bot.config[message.guild.id].prefix}help [command]\``)
            .setColor(bot.config[message.guild.id].colors.default);

        for(j = 0; j < categories.length; j++) {
            if(!categories[j]) continue
            let cmds = commands.filter(c => c.help.cat === categories[j]);
            let cmdNames = cmds.map(c => `\`${c.help.name}\``);
            helpEmbed.addField(`>${categories[j].replace("Staff - ", "")}`, cmdNames.join(" **|** "))
        }
        message.channel.send(helpEmbed)
    }

};

module.exports.help = {
    name: "staffHelp",
    cat: "Staff - Utility",
    description: "list of staff commands",
    usage: "staffHelp (command)",
    examples: ["staffHelp ban"]
};

module.exports.conf = {
    enabled: true,
    aliases: []
};
