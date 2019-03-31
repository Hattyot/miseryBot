const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    let currency = bot.config[message.guild.id].currency

    let embed = new Discord.RichEmbed()
        .setColor(bot.config[message.guild.id].colors.default)
        .setAuthor(`Roulette Info`, bot.icons[message.guild.id])
        .setDescription(`To start a game or place a bet use \`%roulette ${currency}[bet] [space]\`.
        \`[space]\` is the space you want to bet on. Those should be written exactly as in the image below.
        **Payout multipliers:**
        *Single number* - 36x
        *Dozens* - 3x
        *Columns* - 3x
        *Halves* - 2x
        *Odd/Even* - 2x
        *Colors* - 2x
        **Examples:**
        \`roulette 300 2nd\`
        \`roulette 200 odd\`
        `)
        .setImage(`https://user-images.githubusercontent.com/39061940/55289925-3abb3e80-53d5-11e9-8146-295fe7660e0c.png`)
    message.channel.send(embed)
};

module.exports.help = {
    name: "rouletteInfo",
    cat: "Casino",
    description: "View info about the roulette game",
    usage: `rouletteInfo`,
    examples: [`rouletteInfo`]
};

module.exports.conf = {
    enabled: true,
    aliases: ["bj"]
};