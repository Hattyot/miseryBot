const Discord = require("discord.js");
const request = require('request');
module.exports.run = async (bot, message, args) => {
    request(`https://icanhazdadjoke.com/slack`, (error, response, body) => {

        if(error) return message.channel.send("slight error, whoops");
        let json = JSON.parse(body);
        let embed = new Discord.RichEmbed()
            .setColor(bot.config[message.guild.id].colors.default)
            .setDescription(json.attachments.map(a => a.text));
        message.channel.send(embed)
    })
};

module.exports.help = {
    name: "dadjoke",
    cat: "Fun",
    description: "Gives you a random dad joke",
    usage: "dadjoke",
    examples: ["dadjoke"]
};

module.exports.conf = {
    enabled: true,
    aliases: [],
};