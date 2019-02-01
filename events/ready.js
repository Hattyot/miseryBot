module.exports = async (bot) => {
    console.log("Bot ready");
    bot.user.setActivity(`${bot.config.prefix}help`)
};
