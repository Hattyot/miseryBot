const Discord = require("discord.js")
const ms = require("../../modules/ms.js")
const embedMaker = require("../../modules/embed.js")
const mute = require("../../modules/data.js").mute
module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_ROLES")) return
    if(!args[0]) return embedMaker.command(message)

    let muteMember = getmuteMember()
    let time = ms(args[1])
    let reason = args.slice(2).join(" ")
    let muteRole = message.guild.roles.get(bot.config[message.guild.id].muteRoleID)

    if(!muteMember) return embedMaker.command(message, "[user]")
    if(!time) return embedMaker.command(message, "[time]")
    if(!reason) return embedMaker.command(message, "[reason]")
    if(!time) return embedMaker.command(message, "[time]")

    if(message.member.highestRole.position <= muteMember.highestRole.position) {
        return embedMaker.message(message, `You can't mute a user who has a higher or the same role as you`)
    }
    
    mute.findOne({user_ID: message.author.id}, (err, data) => {
        if (err) return console.trace(err)
        if (data) {
            let timeLeft = Math.floor(data.muteDate + data.muteLength) - Date.now()
            return embedMaker.message(message, `Member is already muted, mute will end in ${ms(timeLeft, {long: true})}`)
        } else {
            let newMute = new mute({
                user_ID: `${muteMember.user.id}`,
                muteLength: Math.floor(ms(time)),
                muteDate: Date.now()
            });
            newMute.save()
                .then(r => console.log(r))
                .catch(e => console.log(e));

            let embed = new Discord.RichEmbed()
                .setColor(bot.config[message.guild.id].colors.orange)
                .setAuthor(`You have been muted`)
                .setDescription(`**Server:** *${message.guild.name}*\n**Muted By:** *<@${message.author.id}>*\n**Reason:** *${reason}*\n**Length:** *${ms(time, {long: true})}*`)
                .setFooter(`Muted At:`)
                .setTimestamp();
            muteMember.send(embed)
            muteMember.addRole(muteRole)
            embedMaker.message(message, `<@${muteMember.user.id}> has been muted for **${ms(time, {long: true})}**. Reason: **${reason}**`)

            unMuteTimer(muteMember, time)
        }
    })

    function getmuteMember() {
        let muteMember = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!muteMember && args[0]) {
            let regex = new RegExp(`(${args[0]})`, `i`)
            let members = message.guild.members.filter(m => m.user.username.match(regex))
            if(members.size === 1) return members.first()
        }
        return muteMember
    }

    function unMuteTimer(muteMember, muteTime) {
        setTimeout(() => {

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
        }, muteTime)
    }
}

module.exports.help = {
    name: "mute",
    cat: "Staff",
    description: "Mute a user",
    usage: `mute [user] [time] [reason]`,
    examples: [`mute @Hattyot 2h being rude`, `mute @Hattyot 2d broke several rules`]
}

module.exports.conf = {
    enabled: true,
    aliases: [],
    cooldown: "3 Seconds",
};