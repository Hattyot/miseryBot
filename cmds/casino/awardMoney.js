const Discord = require("discord.js");
const embedMaker = require("../../modules/embed.js");
const { money } = require("../../modules/data.js");
module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return
    if(!args[0]) return embedMaker.command(message)

    let member = getMember()
    let amount = args[1]
    let currency = bot.config[message.guild.id].currency;

    if(!member) return embedMaker.command(message, "[user]")
    if(!amount) return embedMaker.command(message, "[amount]")

    money.findOne({user_ID: member.user.id}, (err, data) => {
        if(!data) {
            let data = { onHand: 0, inBank: 200, user_ID: message.author.id }
            let newMoney = new money(data)
            newMoney.save()
            giveMoney(member, amount)
        }else {
            giveMoney(member, amount)  
        }
    });

    function giveMoney(member, amount) {
        money.findOneAndUpdate({user_ID: member.user.id}, {$inc: {inBank: amount}}, {new: true}, (err, data) => {
            if(err) return console.log(err)
            return embedMaker.message(message, `<@${member.user.id}> has been given **${currency}${amount}**`)
        });
    }

    function getMember() {
        let _member = message.mentions.members.first() || message.guild.members.get(args[0])
        if(!_member && args[0]) {
            let regex = new RegExp(`(${args[0]})`, `i`)
            let members = message.guild.members.filter(m => m.user.tag.match(regex))
            if(members.size === 1) return members.first()
        }
        return _member
    }
};
module.exports.help = {
    name: "awardMoney",
    cat: "Staff - Casino",
    description: "Award a user money",
    usage: `awardMoney [user] [amount]`,
    examples: [`awardMoney @hattyot 500`]
};

module.exports.conf = {
    enabled: true,
    aliases: ["aw"]
};