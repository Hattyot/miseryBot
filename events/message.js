const level = require("../modules/data.js").level;
const xpCooldown = new Set();
const embedMaker = require("../modules/embed.js");
module.exports = async (bot, message) => {
    if (message.channel.type === "dm") {
        if(message.content.toLowerCase() === "gluttony"){
            message.member.send("Congrats you got the right answer, you've been given 5 points")
            return points.findOne({user_ID: awardMember.user.id}, (err, data) => {
                if(!data) {
                let newPoints = new points({
                    user_ID: `${message.author.id}`,
                    amount: 5
                });
                return newPoints.save()
                    .then(r => console.log(r))
                    .catch(e => console.log(e));
     
                }else {
                    return points.findOneAndUpdate({user_ID: awardMember.user.id}, {$inc: {amount: 5}}, (err, data) => {
                        if(err) return console.log(err)
                    })
                }
            });
        }else {
            if(!message.member) return
            return message.member.send("Thats not the right answer")
        }


    };
    if(message.author.bot) return;
    if(message.type === `PINS_ADD`) return message.delete()
    let messageArray = message.content.replace(/ +(?= )/g, "").split(" ");
    let command = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    let cmd = bot.commands.get(command.slice(bot.config[message.guild.id].prefix.length)) || bot.commands.get(bot.aliases.get(command.slice(bot.config[message.guild.id].prefix.length)))

    if(cmd) {
        if(!cmd.conf.enabled) return
        if(bot.user.id === "548436033390379008" && !cmd.conf.test) return
        if(cmd.help.cat.match(/Staff/i) && !message.member.roles.has("530728428975161344")) return

        if(message.content.startsWith(bot.config[message.guild.id].prefix)) {
            if(message.channel.id === "522979850651435013") {
                if(!message.member.roles.has("530728428975161344")) return

            }
            await cmd.run(bot, message, args);
        }
    }else {
        if(message.channel.id === "549186081007075328" && !message.member.roles.has("530728428975161344")) message.delete()
        if(message.content.toLowerCase() === "%%open") return message.delete()
    }
};
