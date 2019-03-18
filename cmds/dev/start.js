const Discord = require("discord.js");
const { points } = require("../../modules/data.js")
module.exports.run = async (bot, message, args) => {
    if(message.author.id !== "436228721033216009") return

    function sendClaimMessage() {
        // let time = Math.floor(Math.random()*(10800000-600000+1)+600000)
        let time = 6
        setTimeout(() => {
            let embed = new Discord.RichEmbed()
                .setColor(bot.config.colors.default)
                .setTimestamp()
                .setDescription(`Type %claim to claim 5 points`)
                .setAuthor(`Free 5 Points`)
            message.guild.channels.get(`536532064070270986`).send(embed).then(_m => {
                let filter = m => m.content === "%claim"
                _m.channel.awaitMessages(filter, {max: 1})
                    .then(collected => {
                        let _msg = collected.first()
                        let winner = _msg.member
                        points.findOne({user_ID: winner.user.id}, (err, data) => {
                            if(!data) {
                                let newPoints = new points({
                                    user_ID: `${winner.user.id}`,
                                    amount: 5
                                });
                                newPoints.save()
                                    .then(r => console.log(r))
                                    .catch(e => console.log(e));
                                return winner.send(`You've been given 5 points`)
                            }else {
                                points.findOneAndUpdate({user_ID: winner.user.id}, {$inc: {amount: amount}}, (err, data) => {
                                    if(err) return console.log(err)
                                    winner.send(`You've been given 5 points`)
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