const level = require("../modules/data.js").level;
const xpCooldown = new Set();
const embedMaker = require("../modules/embed.js");
const { huntWinners, points } = require("../modules/data.js")
const looksSame = require('looks-same')
module.exports = async (bot, message) => {
    if (message.channel.type === "dm") {
        if(message.author.bot) return
        if(message.content.toLowerCase() === "gluttony"){
            return huntWinners.findOne({user_ID: message.author.id}, (err, data) => {
                if(data) {
                    return message.channel.send(`youve already claimed this prize once`)
                }else {
                    message.channel.send("Congrats you got the right answer, you've been given 5 points")
                    return points.findOne({user_ID: message.author.id}, (err, data) => {
                        if(!data) {
                            let newPoints = new points({
                               user_ID: `${message.author.id}`,
                               amount: 5
                            });
                        newPoints.save()
                        .then(r => console.log(r))
                        .catch(e => console.log(e));
                       
                        let newWinner = new huntWinners({
                            user_ID: `${message.author.id}`,

                        });
                        return newWinner.save()
                        .then(r => console.log(r))
     
                        }else {
                    
                            return points.findOneAndUpdate({user_ID: message.author.id}, {$inc: {amount: 5}}, (err, data) => {
                                if(err) return console.log(err)
                                let newWinner = new huntWinners({
                                    user_ID: `${message.author.id}`,

                                });
                             return newWinner.save()
                                .then(r => console.log(r))
                            })
                        }
                    })
                }
            })
        }else {
            return message.channel.send("Thats not the right answer")
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
        if(message.attachments.first()) {
            looksSame(`https://cdn.discordapp.com/attachments/549605105616289823/554734208405471233/image0.png`, message.attachments.first().url, (err, {equal}) => {
                if(equal) message.delete()
            })
        }
    }
};
