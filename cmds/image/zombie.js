const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
        .setColor(bot.config[message.guild.id].colors.default)
        .setImage(`https://cdn.discordapp.com/avatars/458311006020435988/a_d684eb4c18e39549ad72618d7503b68e.gif`) 
    message.channel.send(embed)
};

module.exports.help = {
    name: "zombie",
    cat: "Image",
    description: "Gives you apoc's avatar gif",
    usage: "zombie",
    examples: ["zombie"]
};

module.exports.conf = {
    enabled: true,
    aliases: [],
};