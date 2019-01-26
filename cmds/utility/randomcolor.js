const Discord = require("discord.js")
module.exports.run = async (bot, message) => {
    function randomHexColor() {
        return '#' + ('000000' + Math.floor(Math.random()*16777215).toString(16)).slice(-6)
    }
    let color = randomHexColor();
    let embed = new Discord.RichEmbed()
        .addField("Hex:", `${color}`)
        .setThumbnail(`https://dummyimage.com/100x100/${color.slice(1)}/${color.slice(1)}.png`)
        .setColor(color);
    message.channel.send(embed)

}

module.exports.help = {
    name: "randomcolor",
    description: "Get a random hex color",
    usage: `randomcolor`,
    examples: [`randomcolor`]
  }
  
  module.exports.conf = {
    enabled: true,
    aliases: [],
    cooldown: "3 Seconds",
    cat: "Utility"
  };