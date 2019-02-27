const Discord = require("discord.js");
const embedMaker = require("../../modules/embed.js")
module.exports.run = async (bot, message, args) => {
    if(!args[0]) return embedMaker.command(message)
    let list = {
        "458311006020435988": {
            age: 26,
            timeZone: "GMT-5"
        },
        "247920069785419778": {
            age: 19,
            timeZone: "GMT-5"
        },
        "233421409685209090": {
            age: 15,
            timeZone: "GMT-5"
        },
        "189868270407516161": {
            age: 17,
            timeZone: "GMT+0"
        },
        "348889558697377804": {
            age: 19,
            timeZone: "GMT+1"
        },
        "436228721033216009": {
            age: 17,
            timeZone: "GMT+2"
        },
        "318527806642585600": {
            age: 15,
            timeZone: "GMT-6"
        },
        "443241563565457422": {
            age: 13,
            timeZone: "GMT-6"
        },
        "456998650011451392": {
            age: 14,
            timeZone: "GMT-6"
        },
        "289289827549970434": {
            age: 21,
            timeZone: "GMT+10"
        },
        "300293105746182146": {
            age: 16,
            timeZone: "GMT-5"
        },
        "154594066212847616": {
            age: 32,
            timeZone: "GMT+0"
        },
    }

    let member = list[message.mentions.members.first().id]
    if(!member) return embedMaker.command(message, "[Staff Member]")
    embedMaker.message(message, `<@${message.mentions.members.first().id}>\n**Age:**${member.age}\n**Time Zone:**${member.timeZone}`)
};

module.exports.help = {
    name: "staffInfo",
    cat: "Staff - Info",
    description: "Get age and timezone of a staff member",
    usage: "staffInfo [Staff Member]",
    examples: ["staffInfo Hattyot"]
};

module.exports.conf = {
    enabled: true,
    aliases: []
};
