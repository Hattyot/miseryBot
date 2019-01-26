const Discord = require("discord.js");
const channelData = require("../../modules/data.js").channelData;
const _ = require("underscore-node");
module.exports.run = async (bot, message, args) => {
    if(message.author.id === "436228721033216009") {
        channelData.find({}, (err, data) => {
            if(err) console.log(err);
            let guild = bot.guilds.get("522979850651435008");
            let threeMostActive = {
                "first": `${guild.channels.get(data[0].channel_ID).name} - ${data[0].messageAmount}`,
                "second": `${guild.channels.get(data[1].channel_ID).name} - ${data[1].messageAmount}`,
                "third": `${guild.channels.get(data[2].channel_ID).name} - ${data[2].messageAmount}`
            };
            let threeLeastActive = {
                "first": `${guild.channels.get(data[data.length - 1].channel_ID).name} - ${data[data.length - 1].messageAmount}`, //last
                "second": `${guild.channels.get(data[data.length - 2].channel_ID).name} - ${data[data.length - 2].messageAmount}`, //last - 1
                "third": `${guild.channels.get(data[data.length - 3].channel_ID).name} - ${data[data.length - 3].messageAmount}` //last - 2
            };
            let total = _.reduce(data, (memo, reading) => {return memo + reading.messageAmount;}, 0);
            let embed = new Discord.RichEmbed()
                .setAuthor(`${guild.name} Weekly Data Report`, bot.icons[guild.id])
                .setDescription("Last weeks activity report | Btw this is basically just so I can learn MongoDB")
                .addField("Total Messages Sent", total, false)
                .addField("Most Used Channels", `1. ${threeMostActive.first}\n2. ${threeMostActive.second}\n3. ${threeMostActive.third}`)
                .addField("Most Least Channels", `1. ${threeLeastActive.first}\n2. ${threeLeastActive.second}\n3. ${threeLeastActive.third}`)
                .setColor(bot.config.embedColor)
                .setFooter("Will probably include more data later or just scrap it");
            message.channel.send(embed)
        }).sort({messageAmount: -1})
    }
};

module.exports.help = {
    name: "requestdata",
};

module.exports.conf = {
    enabled: true,
    aliases: [],
};