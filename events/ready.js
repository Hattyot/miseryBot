module.exports = async (bot) => {
    console.log("Bot ready");
    bot.user.setActivity(`${bot.config[message.guild.id].prefix}help`)
};
