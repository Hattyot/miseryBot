const Discord = require("discord.js");
const request = require('request');
module.exports.run = async (bot, message, args) => {
    request(`https://dog.ceo/api/breeds/image/random`, (error, response, body) => {

        if(error) return message.channel.send("slight error, whoops");
        let json = JSON.parse(body);
    
        let embed = new Discord.RichEmbed()
            .setColor(bot.config.embedColor)
            .setImage(json.message);
        message.channel.send(embed)
    })
};

module.exports.help = {
    name: "dog",
    cat: "Image",
    description: "Gives you a random dog image",
    usage: "dog",
    examples: ["dog"]
};

module.exports.conf = {
    enabled: true,
    aliases: [],
};