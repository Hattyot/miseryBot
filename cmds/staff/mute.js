const Discord = require("discord.js")
const ms = require("../../modules/ms.js")
const embedMaker = require("../../modules/embed.js")
const mute = require("../../modules/data.js").mute
module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_ROLES")) return

    let member = message.mentions.members.first();
    let time = args[1]
    let reason = args.slice(2).join(" ")
    let muteRole = message.guild.roles.get(bot.config[message.guild.id].muteRoleID)
    let length
    let fintime

    if(!member) return embedMaker.command(message, "[user]")
    if(!time) return embedMaker.command(message, "[time]")
    if(!reason) return embedMaker.command(message, "[reason]")

    if(message.member.highestRole.position <= member.highestRole.position) {
        return embedMaker.message(message, `You can't mute a user who has a higher or the same role as you`)
    }

    if(ms(time)) {
        length = ms(ms(time), {long: true})
        fintime = ms(time) + Date.now()
    }else {
        return embedMaker.command(message, "[time]")
    }
    mute.findOne({user_ID: message.author.id}, (err, data) => {
        if(data) {
            let timeLeft = Math.floor(data.muteDate + data.muteLength) - Date.now()
            return embedMaker.message(message, `Member is already muted, mute will end in ${ms(timeLeft, {long: true})}`)
        }else {
            let newMute = new mute({
                user_ID: `${message.author.id}`,
                muteLength: Math.floor(ms(time)),
                muteDate: Date.now()
            });
            newMute.save()
                .then(r => console.log(r))
                .catch(e => console.log(e));


            let embed = new Discord.RichEmbed()
                .setColor(bot.config[message.guild.id].embedColor)
                .setAuthor(`You have been muted`)
                .setDescription(`**Server:** ${message.guild.name}\n**Muted By:** <@${message.author.id}>\n**Reason:** ${reason}\n**Length:** ${length}`)
                .setFooter(`Muted At:`)
                .setTimestamp();
            member.send(embed)
            let muterole = message.guild.roles.get(bot.config[message.guild.id].muteRoleID)
            if(muteRole) {
                member.addRole(muterole)
            }else {
                return message.channel.send("I couldn't find the mute role, please check data.json")
            }
            setTimeout(() => {
                let muteRole = message.guild.roles.get(bot.config[message.guild.id].muteRoleID)
                if(muteRole) member.removeRole(muterole)
                mute.findOneAndRemove({user_ID: member.user.id}, (err, data) => {
                    if(err) return console.log(err)
                })
                let embed2 = new Discord.RichEmbed()
                    .setDescription(`You have been unmuted **Server:**${message.guild.id}\n**Unmuted By:** The Bot\n**Reason:** Automatic Unmute`)
                    .setColor(bot.config[message.guild.id].embedColor)
                    .setTimestamp()
                    .setFooter(`Unmuted At:`)
                member.send(embed2)
            }, ms(time))
        }
    })
}

module.exports.help = {
    name: "mute",
    cat: "Staff",
    description: "Mute a user",
    usage: `mute [user] [time] [reason]`,
    examples: [`mute @Hattyot 2h being rude`, `mute @Hattyot 2d broke several rules`]
}

module.exports.conf = {
    enabled: false,
    aliases: [],
    cooldown: "3 Seconds",
};