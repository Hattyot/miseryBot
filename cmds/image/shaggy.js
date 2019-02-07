const Discord = require("discord.js");
const request = require('request');
module.exports.run = async (bot, message, args) => {
    let urls = [
        "https://www.reddit.com/r/TheChurchOfShaggy/.json?sort=rising&t=week&limit=100",
        "https://www.reddit.com/r/Shaggymemes/.json?sort=rising&t=week&limit=100",
        "https://www.reddit.com/r/shaggy/.json?sort=rising&t=week&limit=100",
    ]
    let requestUrl = urls[Math.floor(Math.random() * urls.length)];
    request(requestUrl, (error, response, body) => {

        if(error) return message.channel.send("slight error, whoops");
        let json = JSON.parse(body);
        let mainObject = json.data.children;
        let urls = {};
        let randomImageNumber = Math.floor(Math.random() * 80);

        for(let i = 0; i < mainObject.length; i++) {
            urls[i + 1] = mainObject[i].data.url;
        }

        let embed = new Discord.RichEmbed()
            .setColor(bot.config[message.guild.id].embedColor)
            .setImage(urls[randomImageNumber]);
        message.channel.send(embed)
    })
};

module.exports.help = {
    name: "bunny",
    cat: "Image",
    description: "Gives you a random bunny image",
    usage: "bunny",
    examples: ["bunny"]
};

module.exports.conf = {
    enabled: true,
    aliases: [],
};