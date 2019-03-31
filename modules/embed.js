const Discord = require("discord.js");
const bot = require("../bot.js");
module.exports = {
    message: (message, text, options, callback) => {
        options = options || {};
        let embed = new Discord.RichEmbed()
            .setColor(bot.config[message.guild.id].colors.default)
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setDescription(`${text}`)
            .setTimestamp();

        if (options.thumbnail) embed.setThumbnail(options.thumbnail);
        if (options.color) embed.setColor(options.color);
        if (options.title) embed.setTitle(options.title);
        if (options.footer) embed.setFooter(options.footer);
        if (options.author) {
            if (options.aIcon) {
                embed.setAuthor(options.author, options.aIcon)
            } else {
                embed.setAuthor(options.author)
            }
        }
        if (options.edit) {
            message.edit(embed).then(m => {
                if(callback) return callback(m)
            })
        } else {
            message.channel.send(embed).then(m => {
                if(callback) return callback(m)
            })
        }

    },
    image: (message, link) => {
        let embed = new Discord.RichEmbed()
            .setColor(bot.config[message.guild.id].colors.default)
            .setImage(link)
            .setTimestamp()
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL);
        return message.channel.send(embed)
    },
    embed: (message, text, options) => {
        options = options || {};
        let embed = new Discord.RichEmbed()
            .setColor(bot.config[message.guild.id].colors.default)
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setDescription(`${text}`)
            .setTimestamp();

        if (options.thumbnail) embed.setThumbnail(options.thumbnail);
        if (options.color) embed.setColor(options.color);
        if (options.title) embed.setTitle(options.title);
        if (options.footer) embed.setFooter(options.footer);
        if (options.author) {
            if (options.aIcon) {
                embed.setAuthor(options.author, options.aIcon)
            } else {
                embed.setAuthor(options.author)
            }
        }
        return embed
    },
    command: (message, param, callback) => {
        let messageArray = message.content.split(" ");
        let commandName = messageArray[0].slice(bot.config[message.guild.id].prefix.length)
        let command = bot.commands.get(commandName.toLowerCase()) || bot.commands.get(bot.aliases.get(commandName))
        let name = command.help.name;
        let description = command.help.description;
        let usage = command.help.usage;
        let examples = command.help.examples.join(`\n${bot.config[message.guild.id].prefix}`);
        let exampleText;
        command.help.examples.length === 1 ?  exampleText = "Examples" : exampleText = "Example";

        if (param) {
            if (param.startsWith("[" || "(") && param.endsWith("]" || ")")) {
                let embed = new Discord.RichEmbed()
                    .setColor(bot.config[message.guild.id].colors.default)
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL)
                    .setDescription(`Invalid \`${param}\` argument given.\n\n**Usage:**\n    *${bot.config[message.guild.id].prefix}${command.help.usage}\n**${exampleText}:**\n${bot.config[message.guild.id].prefix}${examples}*`);
                message.channel.send(embed).then(m => {
                    if(callback) return callback(m)
                })
            }
        } else {
            let embed = new Discord.RichEmbed()
                .setColor(bot.config[message.guild.id].colors.default)
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL)
                .setTitle(`Command: ${bot.config[message.guild.id].prefix}${name}`)
                .setDescription(`**Description:** ${description}\n**Usage:** ${bot.config[message.guild.id].prefix}${usage}\n**${exampleText}:**\n${bot.config[message.guild.id].prefix}${examples}`);
            message.channel.send(embed).then(m => {
                if(callback) return callback(m)
            })
        }
    },
};
