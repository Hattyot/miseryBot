const Discord = require("discord.js")
const level = require("../../modules/data.js").level;
module.exports.run = async (bot, message, args) => {
    let member = message.mentions.members.first();
    if(!member) member = message.member

    level.findOne({guild_ID: message.guild.id, user_ID: member.user.id}, (err, data) => {
        level.find({guild_ID: message.guild.id}, (err, data2) => {
            if(err) return console.log(err)
            let rank = `#${Math.floor(data2.findIndex(data => data.user_ID === member.user.id)) + 1}`;
            let currentTotalXP = data.xp
            let level = data.level
            let nextLevelXP = (5 * (Math.pow(level, 2)) + 50 * level + 100);
            let nextLevelTotalXP = xpi(level + 1);
            let missingXP = nextLevelTotalXP - currentTotalXP;
            let currentLevelXP = nextLevelXP - missingXP;
            let embed = new Discord.RichEmbed()
                .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
                .setColor(bot.config[message.guild.id].embedColor)
                .addField("Rank", `${rank}`, true)
                .addField("Level", `${level}`, true)
                .addField("XP", `${currentLevelXP}/${nextLevelXP} (total: ${currentTotalXP})`, true)
            message.channel.send(embed)
        }).sort({xp: -1})
    });

    function xpi(level) {
        let xpi = 0
        for(let i = 0; i < Math.floor(level); i++) {
            xpi = xpi + (5*(Math.pow(i, 2))+50*i+100)
        }
        return(xpi)
    }
}

module.exports.help = {
    name: "rank",
    cat: "KKK rank",
    description: "See the xp, level and rank of a user",
    usage: `rank (user)`,
    examples: [`rank`, `rank @Hattyot`]
}

module.exports.conf = {
    enabled: true,
    aliases: [],
};