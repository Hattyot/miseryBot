const mute = require("../modules/data.js").mute
const Discord = require("discord.js")
const ms = require("../modules/ms.js")
module.exports = async (bot) => {
    console.log("Bot ready");
    bot.user.setActivity(`%help`)
    bot.guilds.forEach(g => bot.icons[g.id] = g.iconURL)
    let guild = bot.guilds.get("522979850651435008")
    guild.fetchMembers()

    mute.find({}, (err, data) => {
        if(err) return console.trace(err)
        for(let i = 0; i < data.length; i++) {
            let timeLeft = Math.floor(data[i].muteDate + data[i].muteLength) - Date.now()
            timeLeft < 0 ? unmute(data[i].user_ID) : continueMute(data[i].user_ID, timeLeft)
        }
    })

    function continueMute(userID, timeLeft) {
        setTimeout(() => {
            unmute(userID)
        }, timeLeft)
    }

    function unmute(userID) {
        mute.findOneAndRemove({user_ID: userID}, (err, data) => {
            if(err) return console.log(err)

            let member = guild.members.get(`${userID}`)
            let muteRole = guild.roles.get(bot.config[guild.id].muteRoleID)
            if(!member) return

            member.removeRole(muteRole)
            mute.findOneAndRemove({user_ID: userID}, (err, data) => {
                if(err) return console.log(err)
            })
    
            let embed = new Discord.RichEmbed()
                .setAuthor(`You have been unmuted`)
                .setDescription(`**Server:** *${guild.name}*\n**Unmuted By:** *The Bot*\n**Reason:** *Automatic Unmute*`)
                .setColor(bot.config[guild.id].colors.green)
                .setTimestamp()
                .setFooter(`Unmuted At:`)
            member.send(embed)
        })
    }
};
