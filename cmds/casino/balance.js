const Discord = require("discord.js");
const money = require("../../modules/data.js").money;
module.exports.run = async (bot, message, args) => {
    let member = message.mentions.members.first();
    if(!member) member = message.member;

    money.findOne({user_ID: member.user.id}, (err, data) => {
        let currency = bot.config[message.guild.id].currency;
        let hand = data.onHand;
        let bank = data.inBank;
        let total = hand + bank;
        let embed = new Discord.RichEmbed()
            .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
            .addField("On Hand", `${currency}${hand}`, true)
            .addField("In Bank", `${currency}${bank}`, true)
            .addField("Total", `${currency}${total}`, true)
            .setColor(bot.config[message.guild.id].embedColor)
            .setTimestamp();
        message.channel.send(embed)
    });
};
module.exports.help = {
    name: "balance",
    cat: "Casino",
    description: "See how much money a user has",
    usage: `balance (user)`,
    examples: [`balance`, `balance @Hattyot`]
};

module.exports.conf = {
    enabled: true,
    aliases: ["bal"]
};