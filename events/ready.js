const Discord = require("discord.js");
const channelData = require("../modules/data.js").channelData;
const _ = require("underscore-node");
module.exports = async (bot) => {
    bot.guilds.forEach(guild => {
        guild.icon ? bot.icons[guild.id] = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp` : bot.icons[guild.id] = "";

        guild.channels.forEach(channel => {
            if(channel.type === "text") {
                channelData.findOne({'channel_ID': `${channel.id}`}, (err, data) => {
                    if(!data) {
                        let newChannelData = new channelData({
                            channel_ID: `${channel.id}`,
                            channelName: `${channel.name}`,
                            messageAmount: 0
                        });
                        newChannelData.save()
                            .then(r => console.log(r))
                            .catch(e => console.log(e))
                    }
                })
            }
        })

    });
    let weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let date = new Date();
    let date2 = new Date(Date.now() - 60000);
    let currentDay = weekday[date.getDay()];
    let previousDay = weekday[date2.getDay()];
    setInterval(() => {
        let date = new Date();
        let day = weekday[date.getDay()];
        currentDay = day;
        if(currentDay !== previousDay) {
            if(previousDay === "Sunday" && currentDay === "Monday") {
                channelData.updateMany({}, {messageAmount: 0}, (err, data) => {
                    if(err) return console.log(err);
                    console.log(data);
                });
            }
            dataReport()
        }else {
            previousDay = day
        }
    }, 60000);
    function dataReport() {
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
            let channel = guild.channels.get("536532064070270986");
            channel.send(embed)
        }).sort({messageAmount: -1})
    }
    console.log("Bot ready");
    bot.user.setActivity("I'm miserable")
};
