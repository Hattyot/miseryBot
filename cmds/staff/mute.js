const Discord = require("discord.js")
const ms = require("../../modules/ms.js")
const embedMaker = require("../../modules/embed.js")
const mute = require("../../modules/data.js").mute
const { punishments, mute } = require("../../modules/data.js")
module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_ROLES")) return
    if(!args[0]) return embedMaker.command(message)

    let muteMember = getmuteMember()
    let time = args[1]
    let reason = args.slice(2).join(" ")
    let muteRole = message.guild.roles.get(bot.config[message.guild.id].muteRoleID)

    if(/^\d+$/.test(args[1])) return embedMaker.command(message, "[time]")
    if(!muteMember) return embedMaker.command(message, "[user]")
    if(!time) return embedMaker.command(message, "[time]")
    if(!reason) return embedMaker.command(message, "[reason]")

    time = ms(time)

    if(message.member.highestRole.position <= muteMember.highestRole.position) {
        return embedMaker.message(message, `You can't mute a user who has a higher or the same role as you`)
    }
    
    mute.findOne({user_ID: message.author.id}, (err, data) => {
        if (err) return console.trace(err)
        if (data) {
            let timeLeft = Math.floor(data.muteDate + data.muteLength) - Date.now()
            return embedMaker.message(message, `Member is already muted, mute will end in ${ms(timeLeft, {long: true})}`)
        } else {
            let embed = new Discord.RichEmbed()
                .setColor(bot.config[message.guild.id].colors.orange)
                .setAuthor(`You have been muted`)
                .setDescription(`**Server:** *${message.guild.name}*\n**Muted By:** *<@${message.author.id}>*\n**Reason:** *${reason}*\n**Length:** *${ms(time, {long: true})}*`)
                .setFooter(`Muted At:`)
                .setTimestamp();
            muteMember.send(embed)
            muteMember.addRole(muteRole)
            punishments.find({user_ID: muteMember.user.id, type: `Mute`}, (err, data) => {
                embedMaker.message(message, `<@${muteMember.user.id}> has been muted for **${ms(time, {long: true})}**. Reason: **${reason}**\n\nThis user has been muted **${data.length}** times before`)
                punishments.find({}, (err, data) => {
                    let newMute = new punishments({
                        user_ID: muteMember.user.id,
                        type: `Mute`,
                        message: reason,
                        time: Date.now(),
                        caseNumber: data.length
                    });
                    newMute.save()
                        .then(r => console.log(r))
                        .catch(e => console.log(e));
                    let newMuteTimer = new mute({
                        user_ID: muteMember.user.id,
                        muteLength: time,
                        muteDate: Date.now()
                    });
                    newMuteTimer.save()
                        .then(r => console.log(r))
                        .catch(e => console.log(e));
                })

            })
            unMuteTimer(muteMember, time)
        }
    })

    function getmuteMember() {
        let muteMember = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!muteMember && args[0]) {
            let regex = new RegExp(`(${args[0]})`, `i`)
            let members = message.guild.members.filter(m => m.user.tag.match(regex))
            if(members.size === 1) return members.first()
        }
        return muteMember
    }

    function unMuteTimer(muteMember, muteTime) {
        setTimeout(() => {
            muteMember = message.guild.members.get(muteMember.user.id)
            if(muteMember.roles.has(muteRole)) {
                muteMember.removeRole(muteRole)
                mute.findOneAndDelete({user_ID: muteMember.user.id}, (err, data) => {
                    if(err) return console.log(err)
                })
                let embed2 = new Discord.RichEmbed()
                    .setAuthor(`You have been unmuted`)
                    .setDescription(`**Server:** *${message.guild.name}*\n**Unmuted By:** *The Bot*\n**Reason:** *Automatic Unmute*`)
                    .setColor(bot.config[message.guild.id].colors.green)
                    .setTimestamp()
                    .setFooter(`Unmuted At:`)
                muteMember.send(embed2)
            }
        }, muteTime)
    }
}

module.exports.help = {
    name: "mute",
    cat: "Staff - Moderation",
    description: "Mute a user",
    usage: `mute [user] [time] [reason]`,
    examples: [`mute @Hattyot 2h being rude`, `mute Hattyot 2d broke several rules`, `mute 436228721033216009 10m spam`]
}

module.exports.conf = {
    enabled: true,
    aliases: [],
    cooldown: "3 Seconds"
};