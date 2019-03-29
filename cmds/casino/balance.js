const Discord = require("discord.js");
const { money } = require("../../modules/data.js");
module.exports.run = async (bot, message, args) => {
    let member = getMember()

    money.findOne({user_ID: member.user.id}, (err, data) => {
        if(!data) {
            let data = { onHand: 0, inBank: 200, user_ID: message.author.id }
            let newMoney = new money(data)
            newMoney.save()

            sendEmbed(member, data)
        }else {
            sendEmbed(member, data)
        }
    });

    function sendEmbed(member, data) {
        let currency = bot.config[message.guild.id].currency;
        let hand = data.onHand;
        let bank = data.inBank;
        let total = hand + bank;
        let embed = new Discord.RichEmbed()
            .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
            .addField("On Hand", `${currency}${hand}`, true)
            .addField("In Bank", `${currency}${bank}`, true)
            .addField("Total", `${currency}${total}`, true)
            .setColor(bot.config[message.guild.id].colors.default)
            .setTimestamp();
        message.channel.send(embed)
    }

    function getMember() {
        let _member = message.mentions.members.first() || message.guild.members.get(args[0])
        if(!args[0] && !_member) {
            return message.member
        }else if(!_member && args[0]) {
            let regex = new RegExp(`(${args[0]})`, `i`)
            let members = message.guild.members.filter(m => m.user.tag.match(regex))
            if(members.size === 1) return members.first()
        }
        return _member
    }
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