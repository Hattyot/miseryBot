const Discord = require("discord.js");
const request = require('request');
module.exports.run = async (bot, message, args) => {
    request(`http://aws.random.cat/meow`, (error, response, body) => {

        if(error) return message.channel.send("slight error, whoops");
        let json = JSON.parse(body);

        let embed = new Discord.RichEmbed()
            .setColor(bot.config[message.guild.id].embedColor)
            .setImage(json.file);
        message.channel.send(embed)
    })
};

module.exports.help = {
    name: "cat",
    cat: "Image",
    description: "Gives you a random cat image",
    usage: "cat",
    examples: ["cat"]
};

module.exports.conf = {
    enabled: true,
    aliases: [],
};