const Discord = require("discord.js");
const moment = require("moment");
module.exports.run = async (bot, message) => {
    let verificationLevels = [
        'None',
        'Low',
        'Medium',
        '(╯°□°）╯︵ ┻━┻',
        '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
    ];
    let guild = message.guild;
    let owner = guild.members.find("id", `${guild.ownerID}`).user.tag;
    let region = guild.region;
    let categorycount = guild.channels.filter(chl => chl.type === "category").array().length;
    let txtcount = guild.channels.filter(chl => chl.type === "text").array().length;
    let voicecount = guild.channels.filter(chl => chl.type === "voice").array().length;
    let members = guild.members.array().length;
    let humancount = guild.members.filter(member => member.user.bot === false).array().length;
    let botcount = guild.members.filter(member => member.user.bot === true).array().length;
    let servercreated = `${moment.utc(guild.createdAt).format("ddd, MMM Do YYYY, HH:mm")} UTC`;
    let verificationlevel = verificationLevels[guild.verificationLevel];
    let rolenum = Math.floor(guild.roles.size) - 1;
    let roles = guild.roles.map(r => `<@&${r.id}>`).join(" ").replace(`<@&${guild.id}>`, '');

    let embed = new Discord.RichEmbed()
        .addField("Owner:", owner, true)
        .addField("Region:", region, true)
        .addField("Verification Level:", verificationlevel, true)
        .addField("Channel Categories:", categorycount, true)
        .addField("Text Channels:", txtcount, true)
        .addField("Voice Channels:", voicecount, true)
        .addField("Members:", members, true)
        .addField("Humans:", humancount, true)
        .addField("Bots:", botcount, true)
        .addField("Created At:", servercreated,)
        .addField(`Role List [${rolenum}]:`, `${roles}`)
        .setColor(bot.config[message.guild.id].colors.default)
        .setTimestamp()
        .setFooter(`ID: ${guild.id}`)
        .setAuthor(`${guild.name}`, bot.icons[guild.id]);
    message.channel.send(embed)
};

module.exports.help = {
    name: "serverinfo",
    cat: "Info",
    description: "Get info about the server",
    usage: `serverinfo`,
    examples: [`serverinfo`]
};

module.exports.conf = {
    enabled: true,
    aliases: []
};