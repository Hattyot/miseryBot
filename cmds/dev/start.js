const Discord = require("discord.js");
const { points } = require("../../modules/data.js")
module.exports.run = async (bot, message, args) => {
    if(message.author.id !== "436228721033216009") return
    let time = 0
    sendClaimMessage(time)
    function sendClaimMessage(time) {
        setTimeout(() => {
            let embed = new Discord.RichEmbed()
                .setColor(bot.config[message.guild.id].colors.default)
                .setTimestamp()
                .setDescription(`Type %claim to claim 5 points`)
                .setAuthor(`Free 5 Points`, message.guild.iconURL)
            message.guild.channels.get(`522979850651435013`).send(embed).then(_m => {
                let filter = m => m.content === "%claim"
                _m.channel.awaitMessages(filter, {max: 1})
                    .then(collected => {
                        let _msg = collected.first()
                        let winner = _msg.member
                        points.findOne({user_ID: winner.user.id}, (err, data) => {
                            _m.delete()
                            _msg.delete()
                            if(!data) {
                                let newPoints = new points({
                                    user_ID: `${winner.user.id}`,
                                    amount: 5
                                });
                                newPoints.save()
                                    .then(r => console.log(r))
                                    .catch(e => console.log(e));
                                winner.send(`You've been given 5 points`)
                                let time = Math.floor(Math.random()*(10800000-600000+1)+600000)
                                return sendClaimMessage(time)
                            }else {
                                points.findOneAndUpdate({user_ID: winner.user.id}, {$inc: {amount: 5}}, (err, data) => {
                                    if(err) return console.log(err)
                                    winner.send(`You've been given 5 points`)
                                    let time = Math.floor(Math.random()*(10800000-600000+1)+600000)
                                    return sendClaimMessage(time)
                                });
                            }
                        })
                    })
            })
        }, time)
    }
}

module.exports.help = {
    name: "start",
    cat: "Dev",
    description: "Start the claim system",
    usage: "start",
    examples: ["start"]
}

module.exports.conf = {
    enabled: true,
    aliases: [],
  };