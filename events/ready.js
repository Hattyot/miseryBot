const mute = require("../modules/data.js").mute
const Discord = require("discord.js")
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
                    }, ms(time))
                }
            }

        }
    })

    function unmute(_member) {
        let muteRole = guild.roles.get(bot.config[guild.id].muteRoleID)
        if(muteRole) member.removeRole(muteRole)
        mute.findOneAndRemove({user_ID: member.user.id}, (err, data) => {
            if(err) return console.log(err)
        })
        let embed2 = new Discord.RichEmbed()
            .setDescription(`You have been unmuted **Server:**${guild.name}\n**Unmuted By:** The Bot\n**Reason:** Automatic Unmute`)
            .setColor(bot.config[guild.id].embedColor)
            .setTimestamp()
            .setFooter(`Unmuted At:`)
        _member.send(embed2)
    }
};
