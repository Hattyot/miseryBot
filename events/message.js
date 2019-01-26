const channelData = require("../modules/data.js").channelData;
module.exports = async (bot, message) => {
    if (message.channel.type === "dm") return;
    if(message.author.bot) return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    let cmd = bot.commands.get(command.slice(bot.config.prefix.length));

    if(cmd) {
        if(message.content.startsWith(bot.config.prefix)) {
            cmd.run(bot, message, args);
        }
    }
    
    channelData.findOneAndUpdate({"channel_ID": `${message.channel.id}`}, {$inc:{messageAmount: 1}}, {new: true}, (err, data) => {
        if(err) console.log(err);
        console.log(data);
    })
};