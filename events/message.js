const level = require("../modules/data.js").level;
const xpCooldown = new Set();
const embedMaker = require("../modules/embed.js");
module.exports = async (bot, message) => {
    if (message.channel.type === "dm") return;
    if(message.author.bot) return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    let cmd = bot.commands.get(command.slice(bot.config[message.guild.id].prefix.length)) || bot.commands.get(bot.aliases.get(command.slice(bot.config[message.guild.id].prefix.length)))

    if(cmd) {
        if(message.content.startsWith(bot.config[message.guild.id].prefix)) {
            cmd.run(bot, message, args);
        }
    }

    //kkk level system

    if(message.guild.id === "540846100332937240") {
        level.findOne({user_ID: message.author.id}, (err, data) => {
            if(!data) {
                let newLevel = new level({
                    guild_ID: `${message.guild.id}`,
                    user_ID: `${message.author.id}`,
                    xp: 0,
                    level: 0
                });
                newLevel.save()
                    .then(r => console.log(r))
                    .catch(e => console.log(e));
                let currentXP = 0;
                let currentLevel = 0
                addXP(currentXP, currentLevel)
            }else {
                let currentXP = data.xp;
                let currentLevel = data.level
                addXP(currentXP, currentLevel)
            }
            function xpi(level) {
                let xpi = 0
                for(let i = 0; i < Math.floor(level); i++) {
                    xpi = xpi + (5*(Math.pow(i, 2))+50*i+100)
                }
                return(xpi)
            }
            function addXP(currentXP, currentLevel) {
                if(xpCooldown.has(message.author.id)) return;
                xpCooldown.add(message.author.id);

                let xpCooldownTime = 60;
                setTimeout(() => {
                    xpCooldown.delete(message.author.id)
                },xpCooldownTime * 1000);

                let xpAmount = Math.floor((Math.random() * (15 - 20 + 1)) + 15);
                level.findOneAndUpdate({user_ID: message.author.id, guild_ID: message.guild.id}, {$inc: {xp: xpAmount}}, (err, data) => {
                    if(err) return console.log(err)
                });
                let totalXPNextLevel = xpi(currentLevel + 1)
                let newXP = xpAmount + currentXP
                levelUpCheck(totalXPNextLevel, newXP)
            }

            function levelUpCheck(totalXPNextLevel, newXP) {
                if(totalXPNextLevel <= newXP) {
                    level.findOneAndUpdate({user_ID: message.author.id, guild_ID: message.guild.id}, {$inc: {level: 1}}, {new: true}, (err, data) => {
                        if(err) return console.log(err)
                        let currentLevel = data.level
                        let rewardText = `<@${message.author.id}> You've leveled up to Level **${currentLevel + 1}!**`
                        let levelChannel = message.guild.channels.get(bot.config[message.guild.id].lvlChannel)
                        let roleID = bot.config[message.guild.id].levelRoles[currentLevel]
                        if(bot.config[message.guild.id].levelRoles[currentLevel]) {
                            rewardText += ` And you have been given the <@&${roleID}> role`
                            message.member.addRole(roleID)
                            let embed = embedMaker.embed(message, rewardText)

                            if(levelChannel) {
                                return levelChannel.send(embed)
                            }else {
                                return message.channel.send(embed)
                            }

                        }
                    });
                }
            }

        })
    }

};