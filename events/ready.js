const mute = require("../modules/data.js").mute
const Discord = require("discord.js")
const ms = require("../modules/ms.js")
module.exports = async (bot) => {
    console.log("Bot ready");
    bot.user.setActivity(`%help`)

    let guild = bot.guilds.get("522979850651435008")
    mute.find({}, (err, data) => {
        if(data.length > 0) {
            for(let i = 0; i < data.length; i++) {
                let timeLeft = Math.floor(data[i].muteDate + data[i].muteLength) - Date.now()
                if(timeLeft < 0) {
                    let member = guild.members.get(`${data[i].user_ID}`)
                    unmute(member)
                }else {
                    setTimeout(() => {
                        let member = guild.members.get(`${data[i].user_ID}`)
                        unmute(member)
                    }, ms(data.muteLength))
                }
            }

        }
    })

    function unmute(_member) {
        let muteRole = guild.roles.get(bot.config[guild.id].muteRoleID)
        if(muteRole) _member.removeRole(muteRole)
        mute.findOneAndRemove({user_ID: _member.user.id}, (err, data) => {
            if(err) return console.log(err)
        })
        let embed2 = new Discord.RichEmbed()
            .setAuthor(`You have been unmuted`)
            .setDescription(`**Server:** *${guild.name}*\n**Unmuted By:** *The Bot*\n**Reason:** *Automatic Unmute*`)
            .setColor(bot.config[guild.id].colors.green)
            .setTimestamp()
            .setFooter(`Unmuted At:`)
        _member.send(embed2)
    }
};
