const Discord = require("discord.js");
const request = require('request');
module.exports.run = async (bot, message, args) => {
    request(`https://www.reddit.com/r/duck/.json?sort=rising&t=hour&limit=100`, (error, response, body) => {

        if(error) return message.channel.send("slight error, whoops");
        let json = JSON.parse(body);
        let mainObject = json.data.children;
        let urls = {};
        let randomImageNumber = Math.floor(Math.random() * 80);

        for(let i = 0; i < mainObject.length; i++) {
            urls[i + 1] = mainObject[i].data.url;
        }
        let url = urls[randomImageNumber]
        return message.channel.send(url)
    })
};

module.exports.help = {
    name: "duck",
    cat: "Image",
    description: "Gives you a random duck image",
    usage: "duck",
    examples: ["duck"]
};

module.exports.conf = {
    enabled: true,
    aliases: [],
};