const Discord = require("discord.js");
const channelData = require("../../modules/data.js").channelData;
const voiceChannelData = require("../../modules/data.js").voiceChannelData;
const _ = require("underscore-node");
const ms = require("../../modules/ms.js")
module.exports.run = async (bot, message, args) => {
    if(message.author.id === "436228721033216009") {
        channelData.find({}, (err, data) => {
            voiceChannelData.find({}, (err, data2) => {
                if(err) console.log(err);
                let guild = bot.guilds.get("522979850651435008");
                let threeMostActive = {
                    "first": `${guild.channels.get(data[0].channel_ID).name} - ${data[0].messageAmount} messages`,
                    "second": `${guild.channels.get(data[1].channel_ID).name} - ${data[1].messageAmount} messages`,
                    "third": `${guild.channels.get(data[2].channel_ID).name} - ${data[2].messageAmount} messages`
                };
                let threeLeastActive = {
                    "first": `${guild.channels.get(data[data.length - 1].channel_ID).name} - ${data[data.length - 1].messageAmount} messages`, //last
                    "second": `${guild.channels.get(data[data.length - 2].channel_ID).name} - ${data[data.length - 2].messageAmount} messages`, //last - 1
                    "third": `${guild.channels.get(data[data.length - 3].channel_ID).name} - ${data[data.length - 3].messageAmount} messages` //last - 2
                };
                let total = _.reduce(data, (memo, reading) => {return memo + reading.messageAmount;}, 0);
                let mostActiveVC = `${guild.channels.get(data2[0].channel_ID).name} - ${ms(data2[0].timeSpent)}`;
                let leastActiveVC =  `${guild.channels.get(data2[data2.length - 1].channel_ID).name} - ${ms(data2[data2.length - 1].timeSpent)}`;
                let totalVC = _.reduce(data2, (memo, reading) => {return memo + reading.timeSpent;}, 0);

                let embed = new Discord.RichEmbed()
                    .setAuthor(`${guild.name}'s data report`, bot.icons[guild.id])
                    .setDescription("Activity data that has been gathered this week | Btw this is basically just so I can learn MongoDB")
                    .addField("Total Messages Sent", total, false)
                    .addField("Most Used Text Channels", `1. ${threeMostActive.first}\n2. ${threeMostActive.second}\n3. ${threeMostActive.third}`, true)
                    .addField("Least Used Text Channels", `1. ${threeLeastActive.first}\n2. ${threeLeastActive.second}\n3. ${threeLeastActive.third}`, true)
                    .addField("Total time spent in voice channels", `${ms(totalVC, {long: true})}`, false)
                    .addField("Most Used Voice Channel", `1. ${mostActiveVC}`, true)
                    .addField("Least Used Voice Channel", `1. ${leastActiveVC}`, true)
                    .setColor(bot.config.embedColor)
                    .setFooter("Will probably include more data later or just scrap it");
                message.channel.send(embed)
            }).sort({timeSpent: -1});
        }).sort({messageAmount: -1})
    }
};

module.exports.help = {
    name: "requestdata",
    cat: "Dev",
    description: "Request data report",
    usage: "requestdata",
    examples: ["requestdata"]
};

module.exports.conf = {
    enabled: true,
    aliases: [],
};